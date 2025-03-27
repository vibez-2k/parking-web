export interface AspectRatio {
    id: string
    label: string
    width: number
    height: number
    recommendedResolution: string
  }
  
  export const aspectRatios: AspectRatio[] = [
    { id: 'open-graph', label: 'Open Graph', width: 1.91, height: 1, recommendedResolution: '1200 x 628 pixels' },
    { id: 'x-banner', label: 'X Banner', width: 3, height: 1, recommendedResolution: '1500 x 500 pixels' },
    { id: 'x-single-image', label: 'X Single Image Post', width: 16, height: 9, recommendedResolution: '1600 x 900 pixels' },
    { id: 'instagram-square', label: 'Instagram Square', width: 1, height: 1, recommendedResolution: '1080 x 1080 pixels' },
    { id: 'iphone', label: 'iPhone Screen', width: 19.5, height: 9, recommendedResolution: '2556 x 1179 pixels' },
    { id: 'macbook', label: 'MacBook Screen', width: 16, height: 10, recommendedResolution: '2560 x 1600 pixels' },
    { id: 'android', label: 'Android Screen', width: 20, height: 9, recommendedResolution: '2400 x 1080 pixels' },
    { id: '16-9', label: 'Standard 16:9', width: 16, height: 9, recommendedResolution: '1920 x 1080 pixels' },
    { id: '2-1', label: 'Standard 2:1', width: 2, height: 1, recommendedResolution: '1920 x 960 pixels' },
    
    // iOS Widget Sizes
    { id: 'ios-small', label: 'iOS Small Widget', width: 1, height: 1, recommendedResolution: '158 x 158 pixels' },
    { id: 'ios-medium', label: 'iOS Medium Widget', width: 2, height: 1, recommendedResolution: '338 x 158 pixels' },
    { id: 'ios-large', label: 'iOS Large Widget', width: 2, height: 2, recommendedResolution: '338 x 338 pixels' },
    { id: 'ios-extra-large', label: 'iOS Extra Large Widget', width: 4, height: 2, recommendedResolution: '720 x 338 pixels' },
    
    // iOS Widget Sizes for different devices
    { id: 'ios-small-pro', label: 'iOS Small Widget (Pro)', width: 1, height: 1, recommendedResolution: '170 x 170 pixels' },
    { id: 'ios-medium-pro', label: 'iOS Medium Widget (Pro)', width: 2, height: 1, recommendedResolution: '364 x 170 pixels' },
    { id: 'ios-large-pro', label: 'iOS Large Widget (Pro)', width: 2, height: 2, recommendedResolution: '364 x 382 pixels' },
    { id: 'ios-extra-large-pro', label: 'iOS Extra Large Widget (Pro)', width: 4, height: 2, recommendedResolution: '772 x 362 pixels' },
    
    { id: 'ios-small-max', label: 'iOS Small Widget (Max)', width: 1, height: 1, recommendedResolution: '186 x 186 pixels' },
    { id: 'ios-medium-max', label: 'iOS Medium Widget (Max)', width: 2, height: 1, recommendedResolution: '394 x 186 pixels' },
    { id: 'ios-large-max', label: 'iOS Large Widget (Max)', width: 2, height: 2, recommendedResolution: '394 x 412 pixels' },
    { id: 'ios-extra-large-max', label: 'iOS Extra Large Widget (Max)', width: 4, height: 2, recommendedResolution: '836 x 394 pixels' },
  
    { id: 'x-two-images', label: 'X Two Images Post', width: 7, height: 8, recommendedResolution: '700 x 800 pixels' },
    { id: 'x-three-images', label: 'X Three Images Post', width: 7, height: 8, recommendedResolution: '700 x 800 pixels (first two), 700 x 1800 pixels (third)' },
    { id: 'x-four-images', label: 'X Four Images Post', width: 2, height: 1, recommendedResolution: '1200 x 600 pixels' }
  ]
  
  