import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {
    PanResponder,
    Animated,
    Dimensions
} from 'react-native'

interface CardProps {
    swipeThreshold: number,
    children: React.ReactNode
}

const SCREEN_WIDTH = Dimensions.get('window').width

const Card: React.FC<CardProps> = ({swipeThreshold, children}) => {
    const [position, setPosition] = useState(new Animated.ValueXY())

    // Reset card position {x: 0, y: 0}
    const _resetPosition = () => {
        Animated.spring(
            position, // Auto-multiplexed
            {toValue: {x: 0, y: 0}, friction: 3}, // Back to zero
        ).start();
    }

    // Slightly rotate the card as it's dragged away from the initial position,
    // the rotated angled is based on dx
    const _computeCardStyle = () => {
        const rotate = position.x.interpolate({
            inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
            outputRange: ['-45deg', '0deg', '45deg']
        })
        return {
            ...position.getLayout(),
            //transform: [{ rotate }]
        }
    }

    // Swipe a card out, passed the threshold, then the card should animate to disappear
    const _swipeAway = (direction) => {
        console.log('swipeing away')
        const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;
        Animated.timing(
            position, {
            toValue: { x: x * 3, y: 0 },
            duration: 250
        }).start();
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
                _swipeAway('right')
            } else if (gestureState.dx < -swipeThreshold) {
                console.log('swiped to the left')
                _swipeAway('left')
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
            style={_computeCardStyle()}>
            {children}
        </Animated.View>
    )
}

Card.propTypes = {
    swipeThreshold: PropTypes.number.isRequired
}

Card.defaultProps = {}

export default Card
