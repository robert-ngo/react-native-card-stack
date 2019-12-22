import * as React from 'react'
import PropTypes from 'prop-types'
import {
    View,
    StyleSheet,
    Dimensions,
} from 'react-native'

const CardStack = (props) => {
    const {
        data,
        renderItem,
        height,
        width,
        padding,
        layerOffset
    } = props

    const cardStackStyle = {...styles.cardStack, height: height}

    return (
        <View style={cardStackStyle}>
            {data.map((item, index) => {
                const cardStyleLayer = {
                    ...styles.card,
                    zIndex: data.length - index,
                    height: height - 2 * (index + 1) * padding,
                    width: width - (data.length * layerOffset) - padding,
                    top: padding * (index + 1),
                    left: padding,
                    transform: [
                        { translateX: layerOffset * index },
                    ]
                }

                return <View key={index} style={cardStyleLayer}>
                    {renderItem(item)}
                </View>
            })}
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
