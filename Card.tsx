import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {
    View,
    Text,
    StyleSheet,
    PanResponder,
    Animated,
    Dimensions,
} from 'react-native'

const Card = ({props, children}) => {

    const [pan, setPan] = useState(new Animated.ValueXY())

    // Init panResponder
    const initialPanResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: Animated.event([
            null,
            {
                dx: pan.x, // x,y are Animated.Value
                dy: pan.y,
            },
        ]),
        onPanResponderRelease: () => {
            Animated.spring(
                pan, // Auto-multiplexed
                {toValue: {x: 0, y: 0}}, // Back to zero
            ).start();
        },
    });

    const [panResponder, setPanResponder] = useState(initialPanResponder)


    return (
        <Animated.View
            {...panResponder.panHandlers}
            style={pan.getLayout()}>
            {children}
        </Animated.View>
    )
}

Card.propTypes = {}

Card.defaultProps = {}

export default Card
