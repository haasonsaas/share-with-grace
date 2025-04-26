
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Copy, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const URLCleaner = () => {
  const [originalUrl, setOriginalUrl] = useState<string>("");
  const [cleanUrl, setCleanUrl] = useState<string>("");
  const [paramsRemoved, setParamsRemoved] = useState<number>(0);
  const [hasCopied, setHasCopied] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Get the current tab's URL
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.url) {
        setOriginalUrl(tabs[0].url);
        cleanUrlAndUpdateState(tabs[0].url);
      }
    });
  }, []);

  const cleanUrlAndUpdateState = (url: string) => {
    try {
      const urlObj = new URL(url);
      const paramCount = urlObj.searchParams.size;
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
