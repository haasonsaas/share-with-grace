import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Copy, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Declare Chrome types for TypeScript
declare global {
  interface Window {
    chrome: {
      tabs: {
        query: (queryInfo: { active: boolean; currentWindow: boolean }, callback: (tabs: Array<{ url?: string }>) => void) => void;
      };
    };
  }
}

const URLCleaner = () => {
  const [originalUrl, setOriginalUrl] = useState<string>("");
  const [cleanUrl, setCleanUrl] = useState<string>("");
  const [paramsRemoved, setParamsRemoved] = useState<number>(0);
  const [hasCopied, setHasCopied] = useState(false);
  const { toast } = useToast();

  const cleanYouTubeUrl = (url: string): string => {
    try {
      const urlObj = new URL(url);
      if (urlObj.hostname.includes('youtube.com') || urlObj.hostname.includes('youtu.be')) {
        let videoId = '';
        if (urlObj.hostname.includes('youtu.be')) {
          videoId = urlObj.pathname.slice(1);
        } else {
          videoId = urlObj.searchParams.get('v') || '';
        }
        return `https://youtu.be/${videoId}`;
      }
      return url;
    } catch (error) {
      return url;
    }
  };

  const cleanTwitterUrl = (url: string): string => {
    try {
      const urlObj = new URL(url);
      if (urlObj.hostname.includes('twitter.com') || urlObj.hostname.includes('x.com')) {
        const pathParts = urlObj.pathname.split('/');
        if (pathParts.length >= 3) {
          const username = pathParts[1];
          const tweetId = pathParts[3];
          return `https://twitter.com/${username}/status/${tweetId}`;
        }
      }
      return url;
    } catch (error) {
      return url;
    }
  };

  const cleanInstagramUrl = (url: string): string => {
    try {
      const urlObj = new URL(url);
      if (urlObj.hostname.includes('instagram.com')) {
        // Remove query parameters and fragments
        return `https://instagram.com${urlObj.pathname}`;
      }
      return url;
    } catch (error) {
      return url;
    }
  };

  const cleanTikTokUrl = (url: string): string => {
    try {
      const urlObj = new URL(url);
      if (urlObj.hostname.includes('tiktok.com')) {
        // Remove query parameters and fragments
        return `https://tiktok.com${urlObj.pathname}`;
      }
      return url;
    } catch (error) {
      return url;
    }
  };

  const cleanRedditUrl = (url: string): string => {
    try {
      const urlObj = new URL(url);
      if (urlObj.hostname.includes('reddit.com')) {
        // Remove query parameters and fragments
        return `https://reddit.com${urlObj.pathname}`;
      }
      return url;
    } catch (error) {
      return url;
    }
  };

  const cleanLinkedInUrl = (url: string): string => {
    try {
      const urlObj = new URL(url);
      if (urlObj.hostname.includes('linkedin.com')) {
        // Remove query parameters and fragments
        return `https://linkedin.com${urlObj.pathname}`;
      }
      return url;
    } catch (error) {
      return url;
    }
  };

  const cleanFacebookUrl = (url: string): string => {
    try {
      const urlObj = new URL(url);
      if (urlObj.hostname.includes('facebook.com')) {
        // Remove query parameters and fragments
        return `https://facebook.com${urlObj.pathname}`;
      }
      return url;
    } catch (error) {
      return url;
    }
  };

  const cleanMediumUrl = (url: string): string => {
    try {
      const urlObj = new URL(url);
      if (urlObj.hostname.includes('medium.com')) {
        // Remove query parameters and fragments
        return `https://medium.com${urlObj.pathname}`;
      }
      return url;
    } catch (error) {
      return url;
    }
  };

  const cleanPinterestUrl = (url: string): string => {
    try {
      const urlObj = new URL(url);
      if (urlObj.hostname.includes('pinterest.com')) {
        // Remove query parameters and fragments
        return `https://pinterest.com${urlObj.pathname}`;
      }
      return url;
    } catch (error) {
      return url;
    }
  };

  const cleanGitHubUrl = (url: string): string => {
    try {
      const urlObj = new URL(url);
      if (urlObj.hostname.includes('github.com')) {
        // Remove query parameters and fragments
        return `https://github.com${urlObj.pathname}`;
      }
      return url;
    } catch (error) {
      return url;
    }
  };

  const cleanStackOverflowUrl = (url: string): string => {
    try {
      const urlObj = new URL(url);
      if (urlObj.hostname.includes('stackoverflow.com')) {
        // Remove query parameters and fragments
        return `https://stackoverflow.com${urlObj.pathname}`;
      }
      return url;
    } catch (error) {
      return url;
    }
  };

  const cleanQuoraUrl = (url: string): string => {
    try {
      const urlObj = new URL(url);
      if (urlObj.hostname.includes('quora.com')) {
        // Remove query parameters and fragments
        return `https://quora.com${urlObj.pathname}`;
      }
      return url;
    } catch (error) {
      return url;
    }
  };

  const cleanDiscordUrl = (url: string): string => {
    try {
      const urlObj = new URL(url);
      if (urlObj.hostname.includes('discord.com')) {
        // Remove query parameters and fragments
        return `https://discord.com${urlObj.pathname}`;
      }
      return url;
    } catch (error) {
      return url;
    }
  };

  const cleanSlackUrl = (url: string): string => {
    try {
      const urlObj = new URL(url);
      if (urlObj.hostname.includes('slack.com')) {
        // Remove query parameters and fragments
        return `https://slack.com${urlObj.pathname}`;
      }
      return url;
    } catch (error) {
      return url;
    }
  };

  useEffect(() => {
    // Check if we're in a Chrome extension environment
    if (typeof window.chrome !== 'undefined' && window.chrome.tabs) {
      // Get the current tab's URL
      window.chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]?.url) {
          setOriginalUrl(tabs[0].url);
          cleanUrlAndUpdateState(tabs[0].url);
        }
      });
    } else {
      // In development environment, use a sample URL
      const sampleUrl = "https://example.com/page?utm_source=newsletter&utm_medium=email&utm_campaign=welcome";
      setOriginalUrl(sampleUrl);
      cleanUrlAndUpdateState(sampleUrl);
    }
  }, []);

  const cleanUrlAndUpdateState = (url: string) => {
    try {
      const urlObj = new URL(url);
      const paramCount = urlObj.searchParams.size;
      
      // Handle YouTube URLs
      if (urlObj.hostname.includes('youtube.com') || urlObj.hostname.includes('youtu.be')) {
        const cleanedUrl = cleanYouTubeUrl(url);
        setCleanUrl(cleanedUrl);
        setParamsRemoved(paramCount);
        return;
      }
      
      // Handle Twitter URLs
      if (urlObj.hostname.includes('twitter.com') || urlObj.hostname.includes('x.com')) {
        const cleanedUrl = cleanTwitterUrl(url);
        setCleanUrl(cleanedUrl);
        setParamsRemoved(paramCount);
        return;
      }

      // Handle Instagram URLs
      if (urlObj.hostname.includes('instagram.com')) {
        const cleanedUrl = cleanInstagramUrl(url);
        setCleanUrl(cleanedUrl);
        setParamsRemoved(paramCount);
        return;
      }

      // Handle TikTok URLs
      if (urlObj.hostname.includes('tiktok.com')) {
        const cleanedUrl = cleanTikTokUrl(url);
        setCleanUrl(cleanedUrl);
        setParamsRemoved(paramCount);
        return;
      }

      // Handle Reddit URLs
      if (urlObj.hostname.includes('reddit.com')) {
        const cleanedUrl = cleanRedditUrl(url);
        setCleanUrl(cleanedUrl);
        setParamsRemoved(paramCount);
        return;
      }

      // Handle LinkedIn URLs
      if (urlObj.hostname.includes('linkedin.com')) {
        const cleanedUrl = cleanLinkedInUrl(url);
        setCleanUrl(cleanedUrl);
        setParamsRemoved(paramCount);
        return;
      }

      // Handle Facebook URLs
      if (urlObj.hostname.includes('facebook.com')) {
        const cleanedUrl = cleanFacebookUrl(url);
        setCleanUrl(cleanedUrl);
        setParamsRemoved(paramCount);
        return;
      }

      // Handle Medium URLs
      if (urlObj.hostname.includes('medium.com')) {
        const cleanedUrl = cleanMediumUrl(url);
        setCleanUrl(cleanedUrl);
        setParamsRemoved(paramCount);
        return;
      }

      // Handle Pinterest URLs
      if (urlObj.hostname.includes('pinterest.com')) {
        const cleanedUrl = cleanPinterestUrl(url);
        setCleanUrl(cleanedUrl);
        setParamsRemoved(paramCount);
        return;
      }

      // Handle GitHub URLs
      if (urlObj.hostname.includes('github.com')) {
        const cleanedUrl = cleanGitHubUrl(url);
        setCleanUrl(cleanedUrl);
        setParamsRemoved(paramCount);
        return;
      }

      // Handle Stack Overflow URLs
      if (urlObj.hostname.includes('stackoverflow.com')) {
        const cleanedUrl = cleanStackOverflowUrl(url);
        setCleanUrl(cleanedUrl);
        setParamsRemoved(paramCount);
        return;
      }

      // Handle Quora URLs
      if (urlObj.hostname.includes('quora.com')) {
        const cleanedUrl = cleanQuoraUrl(url);
        setCleanUrl(cleanedUrl);
        setParamsRemoved(paramCount);
        return;
      }

      // Handle Discord URLs
      if (urlObj.hostname.includes('discord.com')) {
        const cleanedUrl = cleanDiscordUrl(url);
        setCleanUrl(cleanedUrl);
        setParamsRemoved(paramCount);
        return;
      }

      // Handle Slack URLs
      if (urlObj.hostname.includes('slack.com')) {
        const cleanedUrl = cleanSlackUrl(url);
        setCleanUrl(cleanedUrl);
        setParamsRemoved(paramCount);
        return;
      }
      
      // Default case: remove all query parameters
      urlObj.search = '';
      setCleanUrl(urlObj.toString());
      setParamsRemoved(paramCount);
    } catch (error) {
      console.error('Invalid URL:', error);
      setCleanUrl(url);
      setParamsRemoved(0);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(cleanUrl);
      setHasCopied(true);
      toast({
        title: "URL copied!",
        description: "Clean URL has been copied to your clipboard",
      });
      setTimeout(() => setHasCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-[400px] p-4 bg-background">
      <Card className="p-6 space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-center">Share with Grace</h2>
          <p className="text-sm text-muted-foreground text-center">
            Clean URLs, Share Respectfully
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Original URL</label>
            <div className="p-2 bg-muted rounded-md text-sm break-all">
              {originalUrl}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Clean URL</label>
            <div className="p-2 bg-muted rounded-md text-sm break-all">
              {cleanUrl}
            </div>
          </div>

          {paramsRemoved > 0 && (
            <div className="text-sm text-muted-foreground">
              Removed {paramsRemoved} query parameter{paramsRemoved === 1 ? '' : 's'}
            </div>
          )}

          <div className="flex gap-2">
            <Button
              className="flex-1"
              variant="default"
              onClick={copyToClipboard}
            >
              {hasCopied ? (
                <Check className="h-4 w-4 mr-2" />
              ) : (
                <Copy className="h-4 w-4 mr-2" />
              )}
              {hasCopied ? 'Copied!' : 'Copy Clean URL'}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default URLCleaner;
