import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import '../../language/i18n';

export default function Setting() {

    const [currentLanguage, setcurrentLanguage] = useState('az')

    const { t, i18n } = useTranslation();

    const changeLanguage = (language: string) => {

        i18n.changeLanguage(language)
            .then(res => {
                setcurrentLanguage(language);
            })

    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: '#1C1C1C',
            }}>
                <Text>Select Language</Text>
            <Pressable
                onPress={() => changeLanguage('en')}
                style={{
                    backgroundColor:
                        currentLanguage === 'en' ? '#33A850' : '#d3d3d3',
                    padding: 20,
                }}>
                <Text>Select English</Text>
            </Pressable>
            <Pressable
                onPress={() => changeLanguage('az')}
                style={{
                    backgroundColor:
                        currentLanguage === 'az' ? '#33A850' : '#d3d3d3',
                    padding: 20,
                }}>
                <Text>Dili Sec</Text>
            </Pressable>
        </View>
    )
}

{/* <Text style={{ fontWeight: 'bold', fontSize: 25, color: '#33A850' }}>
                {t('map')}
            </Text> */}