import { StyleSheet,Image, Text, View, ImageBackground } from 'react-native'
import React from 'react'
import ParallaxScrollView from './ParallaxScrollView'

const Header = () => {
    return (
        <ImageBackground>
            <Image
                source={require('@/assets/images/header2.png')}
                style={styles.reactLogo}
            />
        </ImageBackground>
    )
}

export default Header

const styles = StyleSheet.create({
    reactLogo: {
        height: 100,
        width: 350,
        bottom: 0,
        left: 15,
        position: 'relative',
        top: 25,
    },
})