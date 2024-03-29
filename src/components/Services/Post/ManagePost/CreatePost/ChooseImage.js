import React, { useEffect, useState } from 'react';
import { StyleSheet, SectionList, Text, TextInput, View, Button, Image, Alert, TouchableOpacity } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { ScreenKey } from '../../../../../globals/constants'
export default function ChooseImage(props) {
    const pickSingleWithCamera = (cropping, mediaType = 'photo') => {
        ImagePicker.openCamera({
            cropping: cropping,
            width: 500,
            height: 500,
            includeExif: true,
            mediaType,
            includeBase64: true
        })
            .then((image) => {
                // console.log('received image', image);
                // const imageBase64='data:'+image.mime+';base64,'+image.data;
                // props.navigation.navigate(ScreenKey.RepairService,{
                //   imageBase64:imageBase64,
                //   uri: image.path,
                //   width: image.width,
                //   height: image.height,
                //   mime: image.mime,
                // })
                const imageBase64 = image;
                props.navigation.navigate(ScreenKey.RepairService, {
                    imageBase64: imageBase64,
                    uri: image.path,
                    width: image.width,
                    height: image.height,
                    mime: image.mime,
                    path: image.path
                })

            })
            .catch((e) => alert(e));
    }
    const pickSingle = (cropit, circular = false, mediaType) => {
        ImagePicker.openPicker({
            width: 500,
            height: 500,
            cropping: cropit,
            cropperCircleOverlay: circular,
            sortOrder: 'none',
            compressImageMaxWidth: 1000,
            compressImageMaxHeight: 1000,
            compressImageQuality: 1,
            compressVideoPreset: 'MediumQuality',
            includeExif: true,
            cropperStatusBarColor: 'white',
            cropperToolbarColor: 'white',
            cropperActiveWidgetColor: 'white',
            cropperToolbarWidgetColor: '#3498DB',
            includeBase64: true
        })
            .then((image) => {
                // const imageBase64='data:'+image.mime+';base64,'+image.data;
                // props.navigation.navigate(ScreenKey.RepairService,{
                //   imageBase64:imageBase64,
                //   uri: image.path,
                //   width: image.width,
                //   height: image.height,
                //   mime: image.mime,
                // })
                const imageBase64 = image;
                props.navigation.navigate(ScreenKey.RepairService, {
                    imageBase64: imageBase64,
                    uri: image.path,
                    width: image.width,
                    height: image.height,
                    mime: image.mime,
                    path: image.path
                })

            })
            .catch((e) => {
                console.log(e);
                Alert.alert(e.message ? e.message : e);
            });
    }
    const pickMultiple = () => {
        ImagePicker.openPicker({
            multiple: true,
            waitAnimationEnd: false,
            sortOrder: 'desc',
            includeExif: true,
            forceJpg: true,
            includeBase64: true
        })
            .then((images) => {
                let arrImage=[];
                images.map((i) => {
                    // console.log('received image', i);
                   const temp={
                    imageBase64: i,
                    uri: i.path,
                    width: i.width,
                    height: i.height,
                    mime: i.mime,
                    path: i.path
                   }
                   arrImage.push(temp);
                })
                props.navigation.navigate(ScreenKey.CreatePost, {
                  arrImage
                })



                //   this.setState({
                //     image: null,
                //     images: images.map((i) => {
                //       console.log('received image', i);
                //       return {
                //         uri: i.path,
                //         width: i.width,
                //         height: i.height,
                //         mime: i.mime,
                //       };
                //     }),
                //   });
            })
            .catch((e) => alert(e));
    }
    const handleCancel = () => {
        props.navigation.navigate(ScreenKey.CreatePost);
    }
    return (
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end' }}>
            <View style={{ height: "25%", width: '100%', backgroundColor: "#fff", justifyContent: "center", alignItems: 'stretch' }}>

                <Text style={styles.font_title}>Chọn ảnh từ:</Text>

                {/* <View style={styles.borderView}>
                    <TouchableOpacity onPress={() => pickSingleWithCamera(false)}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.font_size}>Camera</Text>
                        </View>

                    </TouchableOpacity>
                </View> */}

                <View style={styles.borderView}>
                    <TouchableOpacity onPress={pickMultiple}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.font_size}>Thư viện</Text>
                        </View>

                    </TouchableOpacity>
                </View>
                <View style={styles.borderView}>
                    <TouchableOpacity onPress={handleCancel}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.font_size}>Hủy</Text>
                        </View>

                    </TouchableOpacity>

                </View>


            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    font_size: {
        fontSize: 20,
        padding: 7,
        paddingLeft: 20,

    },
    borderView: {
        borderBottomWidth: 0.3
    },
    font_title: {
        color: "#1abc9c",
        fontSize: 25,
        padding: 10,
        borderBottomWidth: 0.3,
        borderColor: "#1abc9c"
    }

});