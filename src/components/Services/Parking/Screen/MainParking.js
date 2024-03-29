import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, SectionList, Text, View, Image, TouchableOpacity, BackHandler } from 'react-native';
import { ScreenKey, Tab_Home_ProfileBillContext, notifyBillContext, URL } from '../../../../globals/constants'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MainParking(props) {
    const [token, setToken] = useState('');
    const [apartId, setApartID] = useState('');
    const [userId, setUserId] = useState();
    const [newMessage, setNewMessage] = useState(true);
    const [countMessParking, setCountMessParking] = useState();
    const [statusMessParking, setStatusMessParking] = useState(false);
    const getData = async () => {
        try {
            const _token = await AsyncStorage.getItem('token');
            const _apartId = await AsyncStorage.getItem('apartId');
            const _userId = await AsyncStorage.getItem('infoUser');
            if (_token !== null && _apartId !== null) {
                const _tokenObject = JSON.parse(_token);
                const _apartIdObject = JSON.parse(_apartId);
                const _userIdObject = JSON.parse(_userId);
                setToken(_tokenObject);
                setApartID(_apartIdObject);
                setUserId(_userIdObject.id)
                getcountMessParking(_userIdObject.id, _tokenObject);
            }

        } catch (e) {
            // error reading value
        }
    }
    const getcountMessParking = async (_userId, _token) => {
        console.log("USERID ", _userId);
        console.log("token ", _token);
        const res = await fetch(URL + `api/noti-parking/unread/${_userId}`, {
            method: 'GET',
            headers: {
              Authorization: 'Bearer ' + `${_token}`,
              'Content-Type': 'application/json',
            },
          })
          console.log("bai xe thong bao ",res.status)
        if (res.status === 200) {
            const result = await res.json();
            setCountMessParking(result.unread);
            if (result.unread === 0) {
                setStatusMessParking(false);
            }
            else {
                setStatusMessParking(true);
            }


        }
        else {
            setCountMessParking(0);

        }
    }
    useEffect(() => {



        getData();
        // const backAction = () => {
        //     props.navigation.goBack();
        //     return true;
        // };

        // const backHandler = BackHandler.addEventListener(
        //     "hardwareBackPress",
        //     backAction
        // );

        // return () => backHandler.remove();
        const unsubscribe = props.navigation.addListener('focus', () => {
            getData()
        });

        return unsubscribe;



    }, [props.navigation])
    const handleClickParking = () => {

        props.navigation.navigate(ScreenKey.Parking, {
            imageBase64: '',
            uri: '',
            width: "",
            height: '',
            mime: '',
            path: ''


        })
    }
    const deleteAsyncStorageNotifyBill = async () => {
        try {
            await AsyncStorage.removeItem('notifyBill');
            return true;
        }
        catch (exception) {
            return false;
        }
    }
    const handleClickNotify = () => {

        setNewMessage(false)

        // deleteAsyncStorageNotifyBill();
        props.navigation.navigate(ScreenKey.NotifyParking)
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={styles._title}>
                <Text style={styles._text_title} >Bãi xe</Text>
            </View>


            <View style={styles.margin_top}>
                <View style={styles.service_h}>

                    <View style={styles.shadow_button}>
                        <TouchableOpacity style={styles.container} onPress={handleClickParking}>
                            <Image style={styles.tinyLogo} resizeMode='contain' source={require('../../../../../image/createParking.png')} />
                            <View>
                                <Text style={styles.text}>Xe vi phạm</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.shadow_button}>
                        <TouchableOpacity style={styles.container} onPress={handleClickNotify}>


                            <View style={styles.badgeIconView}>
                                {statusMessParking && (<Text style={styles.badge}>{countMessParking}</Text>)}
                                <Image style={styles.tinyLogo} resizeMode='contain' source={require('../../../../../image/notifyParking.png')} />
                            </View>

                            <View>
                                <Text style={styles.text}>Thông báo</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>

        </View>
    )
}
const styles = StyleSheet.create({
    margin_top: {
        flex: 1,
    },
    service_h: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        // justifyContent: 'space-around',
        // paddingVertical: 10,
        alignContent: 'center',
        alignItems: 'center',
        paddingTop: 20,

    },
    _title: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: 'center',
        padding: 25,
        backgroundColor: "#00a8ff",
        paddingVertical: 10,
        paddingHorizontal: 12,
        elevation: 8,
    },
    _text_title: {
        fontSize: 25,

        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: 'capitalize',
    },
    shadow_button: {
        flex: 1,
        marginHorizontal: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 4,
        // backgroundColor:'red',

    },
    container: {
        display: 'flex',
        //   justifyContent:'center',
        alignItems: 'center',

    },
    tinyLogo: {
        width: 100,
        height: 100,
    },
    text: {
        marginTop: 10,
        color: 'black',
        marginBottom: 10,
        fontSize: 25,
        fontWeight: 'bold',
        color: 'rgba(89, 180, 138, 1)'
    },
    badgeIconView: {
        position: 'relative',
        padding: 10,
    },
    badge: {
        color: '#fff',
        position: 'absolute',
        zIndex: 10,
        top: 1,
        right: 1,
        padding: 3,
        backgroundColor: 'red',
        borderRadius: 5
    }
})