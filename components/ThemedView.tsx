import { ImageBackground, View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  backgroundImage?: any; // Add this prop to accept 
};

export function ThemedView({ 
  style, 
  lightColor, 
  darkColor,
  backgroundImage,
  ...otherProps 
}: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  if (backgroundImage) {
    return (
      <ImageBackground
        source={backgroundImage}
        style={[{ backgroundColor }, style]}
        {...otherProps}
      >
        {otherProps.children}
      </ImageBackground>
    );
  } else {
    return <View style={[{ backgroundColor: '#032443FF' }, style]} {...otherProps} />;
  }
}
