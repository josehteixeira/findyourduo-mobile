import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import { Background } from '../../components/Background';
import { useNavigation, useRoute } from '@react-navigation/native'
import { styles } from './styles';
import { GameParams } from '../../@types/navigation';
import { FlatList, Text, Image, TouchableOpacity, View } from 'react-native';
import { Entypo } from '@expo/vector-icons'
import { THEME } from '../../theme';
import logoImg from '../../assets/logo-nlw-esports.png';
import { Heading } from '../../components/Heading';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';


export function Game() {
    const route = useRoute();
    const game = route.params as GameParams;
    const navigation = useNavigation();

    function handleGoBack() {
        navigation.goBack();
    }

    const [ads, setAds] = useState<DuoCardProps[]>([]);

    useEffect(() => {
        fetch(`http://192.168.1.10:3333/games/${game.id}/ads`)
            .then(response => response.json())
            .then(data => setAds(data));
    }, []);

    return (
        <Background>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleGoBack}>
                        <Entypo name='chevron-thin-left' color={THEME.COLORS.CAPTION_300} size={20} />
                    </TouchableOpacity>

                    <Image source={logoImg} style={styles.logo} />

                    <View style={styles.right} />
                </View>

                <Image source={{ uri: game.bannerUrl }} style={styles.banner} resizeMode="cover" />

                <Heading title={game.title} subtitle="Conecte-se e comece a jogar!" />

                <FlatList
                    horizontal
                    contentContainerStyle={ads.length === 0 ? styles.emptyListContent : styles.contentList}
                    showsHorizontalScrollIndicator={false}
                    style={styles.containerList}
                    ListEmptyComponent={() => (
                        <Text style={styles.emptyListText}>Não há anúncios publicados ainda.</Text>
                    )}
                    data={ads}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <DuoCard data={item} onConnect={() => { }} />
                    )} />

            </SafeAreaView>
        </Background>
    );
}