import React, { useState } from 'react';
import { View, Modal, ModalProps, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { styles } from './styles';
import { MaterialIcons } from '@expo/vector-icons';
import { THEME } from '../../theme';
import { CheckCircle } from 'phosphor-react-native'
import { Heading } from '../Heading';
import * as Clipboard from 'expo-clipboard';

interface Props extends ModalProps {
    discord: string;
    onClose: () => void;
}

export function DuoMatch({ discord, onClose, ...rest }: Props) {
    const [isCopying, setIsCopying] = useState(false);

    async function handleCopyDiscordToClipboard() {
        setIsCopying(true);

        await Clipboard.setStringAsync(discord);
        Alert.alert('Discord copiado!', 'Usuário copiado para a área de transferência.');

        setIsCopying(false);
    }

    return (
        <Modal {...rest} transparent statusBarTranslucent animationType='fade'>
            <View style={styles.container}>

                <View style={styles.content}>

                    <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
                        <MaterialIcons name='close' size={20} color={THEME.COLORS.CAPTION_500} />
                    </TouchableOpacity>

                    <CheckCircle size={64} color={THEME.COLORS.SUCCESS} weight='bold' />

                    <Heading title="Let's play!" subtitle="Agora é só começar a jogar!" style={{ alignItems: 'center', marginTop: 24 }}></Heading>

                    <Text style={styles.label}>
                        Adicione no Discord
                    </Text>

                    <TouchableOpacity style={styles.discordButton} onPress={handleCopyDiscordToClipboard} disabled={isCopying} >
                        <Text style={styles.discord}>
                            {isCopying ? <ActivityIndicator color={THEME.COLORS.PRIMARY} /> : discord}
                        </Text>
                    </TouchableOpacity>

                </View>

            </View>
        </Modal>
    );
}