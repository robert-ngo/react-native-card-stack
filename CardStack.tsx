import * as React from 'react'
import { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import {
    View,
    StyleSheet,
    PanResponder,
    Animated,
    Dimensions,
} from 'react-native'

const CardStack = (props) => {
    const [pan, setPan] = useState(new Animated.ValueXY())
    const [scale, setScale] = useState(new Animated.Value(1))

    const {
        data,
        renderItem,
        height,
        width,
        padding,
        layerOffset
    } = props

    const cardStackStyle = {...styles.cardStack, height: height}

    const panResponder = useMemo(() => PanResponder.create({
        // Ask to be the responder:
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

        onPanResponderGrant: (evt, gestureState) => {
            // The gesture has started. Show visual feedback so the user knows
            // what is happening!
            // gestureState.d{x,y} will be set to zero now
            setPan(new Animated.ValueXY())
            Animated.spring(
                scale,
                { toValue: 1.1, friction: 5}
            ).start()
        },
        onPanResponderMove: (evt, gestureState) => {
            setPan({x: gestureState.dx, y: gestureState.dy})
        },
        onPanResponderTerminationRequest: (evt, gestureState) => true,
        onPanResponderRelease: (evt, gestureState) => {
            // The user has released all touches while this view is the
            // responder. This typically means a gesture has succeeded
            //console.log('onPanResponderRelease', evt, gestureState)
            Animated.spring(
                scale,
                { toValue: 1, friction: 3}
            ).start()
            Animated.spring(
                pan,
                { toValue: 0, friction: 3}
            )
        },
        onPanResponderTerminate: (evt, gestureState) => {
            // Another component has become the responder, so this gesture
            // should be cancelled
            //console.log('onPanResponderTerminate', evt, gestureState)
        },
        onShouldBlockNativeResponder: (evt, gestureState) => {
            // Returns whether this component should block native components from becoming the JS
            // responder. Returns true by default. Is currently only supported on android.
            return true;
        },

    }), [])

    let [translateX, translateY] = [pan.x, pan.y];

    let cardStyleLayer = {
        ...styles.card,
        // zIndex: data.length - index,
        // height: height - 2 * (index + 1) * padding,
        width: width - (data.length * layerOffset) - padding,
        //top: padding * (index + 1),
        left: padding,
        transform: [
            { translateX: translateX },
            { translateY: translateY },
            { scale: scale }
        ]
    }

    return (
        <View style={cardStackStyle}>
            <Animated.View style={cardStyleLayer} {...panResponder.panHandlers}>
                {renderItem(data[0])}
            </Animated.View>
        </View>
    )
}

CardStack.propTypes = {
    data: PropTypes.array.isRequired,
    renderItem: PropTypes.func.isRequired,
    layerOffset: PropTypes.number,

    // the height of the wrapper, default value is 400
    height: PropTypes.number,

    // the width of the wrapper, default value is screen width
    width: PropTypes.number,

    // the padding between the wrapper and the cards element
    padding: PropTypes.number
}

CardStack.defaultProps = {
    layerOffset: 20,
    height: 400,
    width: Dimensions.get('window').width,
    padding: 15
}

const styles = StyleSheet.create({
    cardStack: {
        flexDirection: 'column',
        backgroundColor: 'green',
        padding: 20,
    },
    card: {
        backgroundColor: 'red',
        padding: 20,
        flex: 1,
        marginBottom: 5,
        position: 'absolute',
        borderWidth: 1,
        borderRadius: 8
    }
})

export default CardStack
