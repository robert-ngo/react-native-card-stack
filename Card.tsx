import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {
    PanResponder,
    Animated,
} from 'react-native'

interface CardProps {
    swipeThreshold: number,
    children: React.ReactNode
}

const Card: React.FC<CardProps> = ({swipeThreshold, children}) => {
    const [position, setPosition] = useState(new Animated.ValueXY())

    const _resetPosition = () => {
        Animated.spring(
            position, // Auto-multiplexed
            {toValue: {x: 0, y: 0}, friction: 3}, // Back to zero
        ).start();
    }

    // Init panResponder
    const initialPanResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: Animated.event([null, {
                dx: position.x,
                dy: position.y,
            },
        ]),
        onPanResponderRelease: (evt, gestureState) => {
            if (gestureState.dx > swipeThreshold) {
                console.log('swiped to the right')
            } else if (gestureState.dx < -swipeThreshold) {
                console.log('swiped to the left')
            } else {
                console.log('too weak')
                _resetPosition()
            }
        },
    });

    const [panResponder, setPanResponder] = useState(initialPanResponder)


    return (
        <Animated.View
            {...panResponder.panHandlers}
            style={position.getLayout()}>
            {children}
        </Animated.View>
    )
}

Card.propTypes = {
    swipeThreshold: PropTypes.number.isRequired
}

Card.defaultProps = {}

export default Card
