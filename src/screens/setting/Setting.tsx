import { View, Text, Pressable, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { useTranslation } from 'react-i18next';
import '../../language/i18n';
import { getUserLanguage, saveUserLanguage } from '../../helpers/userLanguage';
import { LanguageContext } from '../../context/Language';

export default function Setting() {
    const {currentLanguage, setcurrentLanguage} = useContext(LanguageContext)
    const { t, i18n } = useTranslation();

    console.log(currentLanguage)

    useEffect(() => {
        saveUserLanguage(currentLanguage).then(res => console.log(`${currentLanguage} asyncstorage əlavə edildi`))
    }, [currentLanguage])

    const changeLanguage = (language: string) => {
        i18n.changeLanguage(language)
            .then(res => {
                setcurrentLanguage(language);
            })

    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>{t('selectlanguage')}</Text>
            </View>
            <View style={styles.languageContainer}>
                <TouchableOpacity style={[styles.language, {backgroundColor: currentLanguage == 'en' ? 'green' : '#1C1C1C'}]} onPress={() => changeLanguage('en')}>
                    <Text style={styles.languageText}>English</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.language, {backgroundColor: currentLanguage == 'az' ? 'green' : '#1C1C1C'}]} onPress={() => changeLanguage('az')}>
                    <Text style={styles.languageText}>Azerbaijan</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.language, {backgroundColor: currentLanguage == 'tr' ? 'green' : '#1C1C1C'}]} onPress={() => changeLanguage('tr')}>
                    <Text style={styles.languageText}>Turkish</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1C1C1C',
        paddingTop: 20
    },
    headerContainer: {},
    headerText: {
        fontSize: 24,
        textAlign: 'center',
        fontWeight: '500',
        fontFamily: 'Outfit-Bold'
    },
    languageContainer: {
        marginTop: 22,
        marginHorizontal: 20,
        gap: 10
    },
    language: {
        borderWidth: 1,
        borderColor: 'white',
    },
    languageText: {
        fontSize: 17,
        fontWeight: '500',
        fontFamily: 'Outfit-Regular',
        paddingLeft: 20,
        paddingVertical: 14
    }
})

{/* <Text style={{ fontWeight: 'bold', fontSize: 25, color: '#33A850' }}>
                {t('map')}
            </Text> */}