"use client";

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Card } from './ui/card';
import { useEmojiStore } from '../lib/emojiStore';
import { Download, Heart, Trash2, Pencil, Check, X } from 'lucide-react';
import { Button } from './ui/button';
import { useAuth } from '@clerk/nextjs';
import { Input } from './ui/input';

interface Emoji {
  id: number;
  image_url: string;
  prompt: string;
  likes_count: number;
  creator_user_id: string;
  isLiked?: boolean;
}

interface Profile {
  user_id: string;
  wallet_address: string | null;
}

export default function EmojiGrid() {
  const [emojis, setEmojis] = useState<Emoji[]>([]);
  const [profiles, setProfiles] = useState<Record<string, Profile>>({});
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingPrompt, setEditingPrompt] = useState('');
  const newEmoji = useEmojiStore((state) => state.newEmoji);
  const { isSignedIn, userId } = useAuth();

  const fetchProfiles = useCallback(async (userIds: string[]) => {
    try {
      const response = await fetch('/api/profiles?userIds=' + userIds.join(','));
      const data = await response.json();
      if (data.success) {
        const profileMap = data.profiles.reduce((acc: Record<string, Profile>, profile: Profile) => {
          acc[profile.user_id] = profile;
          return acc;
        }, {});
        setProfiles(profileMap);
      }
    } catch (error) {
      console.error('Error fetching profiles:', error);
    }
  }, []);

  const fetchEmojis = useCallback(async () => {
    console.log('Fetching emojis');
    try {
      const timestamp = new Date().getTime();
      const response = await fetch(`/api/emojis?t=${timestamp}`);
      const data = await response.json();
      console.log('Fetched emojis:', data);
      if (Array.isArray(data.emojis)) {
        if (isSignedIn && userId) {
          console.log('Fetching user likes');
          const likesResponse = await fetch(`/api/user-likes?userId=${userId}&t=${timestamp}`);
          const likesData = await likesResponse.json();
          console.log('User likes:', likesData);
          const likedEmojiIds = new Set(likesData.likes.map((like: { emoji_id: number }) => like.emoji_id));
          
          const emojisWithLikes = data.emojis.map((emoji: Emoji) => ({
            ...emoji,
            isLiked: likedEmojiIds.has(emoji.id)
          }));

          setEmojis(emojisWithLikes);

          // Buscar perfis dos criadores
          const uniqueUserIds = Array.from<string>(
            new Set<string>(
              emojisWithLikes.map((emoji: Emoji) => emoji.creator_user_id)
            )
          );
          fetchProfiles(uniqueUserIds);
        } else {
          setEmojis(data.emojis.map((emoji: Emoji) => ({ ...emoji, isLiked: false })));
        }
      } else {
        console.error('Unexpected data shape:', data);
      }
    } catch (error) {
      console.error('Error fetching emojis:', error);
    }
  }, [isSignedIn, userId, fetchProfiles]);

  useEffect(() => {
    fetchEmojis();
  }, [fetchEmojis]);

  useEffect(() => {
    if (newEmoji) {
      setEmojis((prevEmojis) => [{ ...newEmoji, isLiked: false }, ...prevEmojis]);
    }
  }, [newEmoji]);

  const handleDownload = (imageUrl: string, prompt: string) => {
    fetch(imageUrl)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `emoji-${prompt}.png`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch(error => console.error('Error downloading image:', error));
  };

  const handleLike = async (emojiId: number) => {
    if (!isSignedIn) {
      console.log('User not signed in, cannot like emoji');
      return;
    }

    try {
      console.log('Sending like request for emoji:', emojiId);
      const response = await fetch('/api/like-emoji', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emojiId }),
      });
      const data = await response.json();
      console.log('Received data from like-emoji:', data);
      if (data.success) {
        setEmojis(prevEmojis =>
          prevEmojis.map(emoji =>
            emoji.id === emojiId
              ? { 
                  ...emoji, 
                  likes_count: data.likes_count,
                  isLiked: data.action === 'liked'
                }
              : emoji
          )
        );
        console.log('Updated emojis after like:', emojis);
      } else {
        throw new Error(data.error || 'Failed to update likes');
      }
    } catch (error) {
      console.error('Error updating likes:', error);
    }
  };

  const handleDelete = async (emojiId: number) => {
    if (!isSignedIn) {
      console.log('User not signed in, cannot delete emoji');
      return;
    }

    try {
      const response = await fetch(`/api/delete-emoji?id=${emojiId}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      
      if (data.success) {
        setEmojis(prevEmojis => prevEmojis.filter(emoji => emoji.id !== emojiId));
      } else {
        throw new Error(data.error || 'Failed to delete emoji');
      }
    } catch (error) {
      console.error('Error deleting emoji:', error);
    }
  };

  const startEditing = (emoji: Emoji) => {
    setEditingId(emoji.id);
    setEditingPrompt(emoji.prompt);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingPrompt('');
  };

  const saveEditing = async (emojiId: number) => {
    try {
      const response = await fetch('/api/update-emoji', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emojiId,
          prompt: editingPrompt,
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setEmojis(prevEmojis =>
          prevEmojis.map(emoji =>
            emoji.id === emojiId
              ? { ...emoji, prompt: editingPrompt }
              : emoji
          )
        );
        setEditingId(null);
        setEditingPrompt('');
      } else {
        throw new Error(data.error || 'Failed to update emoji');
      }
    } catch (error) {
      console.error('Error updating emoji:', error);
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {emojis.map((emoji) => (
        <Card key={emoji.id} className="p-2 relative group">
          <div className="relative">
            <Image
              src={emoji.image_url}
              alt={emoji.prompt}
              width={100}
              height={100}
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDownload(emoji.image_url, emoji.prompt)}
                className="text-white mr-2"
              >
                <Download size={20} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleLike(emoji.id)}
                className={`text-white ${emoji.isLiked ? 'bg-red-500' : ''}`}
              >
                <Heart size={20} fill={emoji.isLiked ? 'currentColor' : 'none'} />
              </Button>
              {userId === emoji.creator_user_id && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(emoji.id)}
                    className="text-white ml-2"
                  >
                    <Trash2 size={20} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => startEditing(emoji)}
                    className="text-white ml-2"
                  >
                    <Pencil size={20} />
                  </Button>
                </>
              )}
            </div>
          </div>
          <div className="mt-2 flex flex-col">
            <div className="flex justify-between items-center text-sm">
              {editingId === emoji.id ? (
                <div className="flex items-center flex-grow">
                  <Input
                    value={editingPrompt}
                    onChange={(e) => setEditingPrompt(e.target.value)}
                    className="text-sm h-7 mr-2"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => saveEditing(emoji.id)}
                    className="h-7 w-7 p-0 mr-1"
                  >
                    <Check size={16} className="text-green-500" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={cancelEditing}
                    className="h-7 w-7 p-0"
                  >
                    <X size={16} className="text-red-500" />
                  </Button>
                </div>
              ) : (
                <>
                  <p className="truncate flex-grow">{emoji.prompt}</p>
                  <span className="ml-2 flex items-center">
                    <Heart size={14} className="mr-1" /> {emoji.likes_count}
                  </span>
                </>
              )}
            </div>
            {profiles[emoji.creator_user_id]?.wallet_address && (
              <div className="text-xs text-gray-500 mt-1 truncate">
                Wallet: {profiles[emoji.creator_user_id]?.wallet_address?.slice(0, 6)}...{profiles[emoji.creator_user_id]?.wallet_address?.slice(-4)}
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}