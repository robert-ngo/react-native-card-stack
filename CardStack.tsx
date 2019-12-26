import * as React from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
} from 'react-native'

import Card from './Card'

const SCREEN_WIDTH = Dimensions.get('window').width

interface CardStackProps {
    data: any[],
    renderItem: any,
    height: number,
    width: number,
    padding: number,
    layerOffset: number,
    swipeThreshold: number
}

const CardStack: React.FC<CardStackProps> = (props) => {
    const {
        data,
        renderItem,
        height,
        width,
        padding,
        layerOffset,
        swipeThreshold
    } = props

    const SCALE_STEP = 0.05
    const cardStackStyle = {...styles.cardStack, height: height}
    const cardStyle = {
        ...styles.card,
        width: width - 2 * padding - layerOffset * (data.length - 1),
        height: height - 2 * padding,
        top: padding,
        left: padding
    }

    return (
        <View style={cardStackStyle}>
            {data.reverse().map((item, index: number) =>

                <Card key={index} swipeThreshold={swipeThreshold}>
                    {console.log('item', item, index, data.length - index - 1)}
                    <View style={{...cardStyle,
                        transform: [
                            //{ scaleX: 1 - (data.length - index - 1) * SCALE_STEP },
                            { scaleY: 1 - (data.length - index - 1) * SCALE_STEP },
                            { translateX: layerOffset * (data.length - index - 1) }
                        ]
                    }}>
                        {renderItem(item)}
                    </View>
                </Card>
            )}
        </View>
    )
}

CardStack.defaultProps = {
    layerOffset: 15,
    height: 400,
    width: SCREEN_WIDTH,
    padding: 15,
    swipeThreshold: SCREEN_WIDTH * 0.25
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
