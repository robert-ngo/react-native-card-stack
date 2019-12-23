import * as React from 'react'
import PropTypes from 'prop-types'
import {
    View,
    StyleSheet,
    Dimensions,
} from 'react-native'

import Card from './Card'

const CardStack = (props) => {
    const {
        data,
        renderItem,
        height,
        width,
        padding,
        layerOffset
    } = props


    const SCALE_STEP = 0.05
    const cardStackStyle = {...styles.cardStack, height: height}
    const cardStyle = {
        ...styles.card,
        width: width - 2 * padding - layerOffset * data.length,
        height: height - padding
    }

    return (
        <View style={cardStackStyle}>
            {data.reverse().map((item, index: number) => <Card key={index}>
                <View style={{...cardStyle,
                    transform: [
                        { scaleX: 1 - (data.length - index) * SCALE_STEP },
                        { scaleY: 1 - (data.length - index) * SCALE_STEP },
                        { translateX: layerOffset * index }
                    ]
                }}>
                    {renderItem(item)}
                </View>
            </Card>)}
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
    padding: PropTypes.number,
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
    },
    card: {
        backgroundColor: 'red',
        padding: 20,
        position: 'absolute',
        borderWidth: 1,
        borderRadius: 8
    }
})

export default CardStack
