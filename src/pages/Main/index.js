import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Text, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import api from '../../services/api';

export default function Main({ navigation }) {

    const [region, setCurrentRegion] = useState(null);
    const [devs, setDevs] = useState([]);
    const [techs, setTechs] = useState('');

    useEffect(() => {
         function loadInitialPosition() {
            Geolocation.getCurrentPosition(({ coords }) => {
                setCurrentRegion({
                    latitude: coords.latitude,
                    longitude: coords.longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04
                })
            }, err => console.log(err));
        }
        loadInitialPosition();
    }, [])



    function handleRegionChanged(region) {
        setCurrentRegion(region);
    }

    //Busco programadores até 10km da latitude e longitude e com as techs especificas
    async function loadDevs() {
        const { latitude, longitude } = region;
        const response = await api.get('search', {
            params: {
                latitude,
                longitude,
                techs: 'NodeJs'
            }
        });
        setDevs(response.data.devs);
    }

    function handleProfile(username) {
        navigation.navigate('Profile', {
            github_username: username
        });
    }


    if (!region) {
        return null;
    }

    return (
        <>
            <MapView
                onRegionChangeComplete={handleRegionChanged}
                style={styles.map}
                initialRegion={region}>
                {devs.map(dev => {
                    return (
                        <Marker
                            key={dev._id}
                            coordinate={{
                                latitude: dev.location.coordinates[1],
                                longitude: dev.location.coordinates[0]
                            }}>
                            <Image
                                style={styles.imagePin}
                                source={{ uri: dev.avatar_url }} />

                            <Callout onPress={() => handleProfile(dev.github_username)}>
                                <View style={styles.callout}>
                                    <Text style={styles.devName}>{dev.name}</Text>
                                    <Text style={styles.devBio}>{dev.bio}</Text>
                                    <Text style={styles.devTechs}>{dev.techs.join(',')}</Text>
                                </View>
                            </Callout>
                        </Marker>
                    )
                })}
            </MapView>
            <View style={styles.searchForm}>
                <TextInput
                    placeholder="Buscar Devs por techs..."
                    placeholderTextColor="#999"
                    onChange={(techs) => setTechs(techs)}
                    autoCapitalize="words"
                    autoCorrect={false}
                    style={styles.input} />
                <TouchableOpacity
                    onPress={loadDevs}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Enviar</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    },
    imagePin: {
        width: 54,
        height: 54,
        borderRadius: 4,
        borderWidth: 4
    },

    callout: {
        width: 260
    },

    devName: {
        fontWeight: 'bold',
        fontSize: 16
    },

    devBio: {
        color: '#666',
        marginTop: 5
    },

    devTechs: {
        marginTop: 5
    },

    searchForm: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    input: {
        flex: 1,
        height: 50,
        backgroundColor: '#fff',
        color: '#333',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4
        },
        elevation: 2,
        marginRight: 10
    },
    button: {
        backgroundColor: '#8e4dff',
        padding: 15,
        borderRadius: 25,
        elevation: 3
    },

    buttonText: {
        color: '#fff'
    }
})
