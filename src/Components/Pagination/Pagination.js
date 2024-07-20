import { View, Animated, Dimensions } from 'react-native';
import React from 'react';
import { styles } from './style';

const Paginator = ({ data, scrollX }) => {
    const { width: screenWidth } = Dimensions.get('window');
    return (
        <View style={styles.container}>
            {data.map((_, i) => {
                const inputRange = [
                    (i - 1) * screenWidth,
                    i * screenWidth,
                    (i + 1) * screenWidth,
                ];

                const dotWidth = scrollX.interpolate({
                    inputRange,
                    outputRange: [7, 9, 7],
                    extrapolate: 'clamp',
                });

                const backgroundColor = scrollX.interpolate({
                    inputRange,
                    outputRange: ['#9E9E9E', '#757575', '#9E9E9E'],
                    extrapolate: 'clamp',
                });

                // const opacity = scrollX.interpolate({
                //   outputRange: [0.3, 1, 0.3],
                //   extrapolate: 'clamp',
                // });

                return (
                    <Animated.View
                        style={[styles.dot, { width: dotWidth, backgroundColor }]}
                        key={i.toString()}
                    />
                );
            })}
        </View>
    );
};

export default Paginator;
