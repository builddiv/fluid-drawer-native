/**
 * ===========================================================================
 * Fluid Drawer Native - React Native Component
 * ===========================================================================
 * 
 * A highly customizable, fluid, and native-feeling drawer component 
 * for React Native. Supports touch gestures, dynamic height adjustments, 
 * and integrates seamlessly with device keyboards.
 * 
 * Author      : Ginhinio Castelen
 * Company     : BUILDDIV LTD
 * Website     : http://www.builddiv.com
 * Version     : 0.7.0
 * License     : MIT
 * 
 * ===========================================================================
 */
import React, { useRef,useEffect, useState } from "react";
import { Animated, PanResponder, StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle,Platform,Keyboard } from "react-native";

interface FluidDrawerNativeProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
    drawerHeight?: number;
    handleVisible?: boolean;
    topTouchAreaStyle:StyleProp<ViewStyle>;
    handleStyle?: StyleProp<ViewStyle>;
    drawerStyle?: StyleProp<ViewStyle>;
    backdropStyle?: StyleProp<ViewStyle>;
    backdropTouchable?: boolean;
  }
  
  const FluidDrawerNative: React.FC<FluidDrawerNativeProps> = ({
    open,
    onClose,
    children,
    drawerHeight = 350,
    handleVisible = true,
    handleStyle,
    drawerStyle,
    backdropStyle,
    topTouchAreaStyle,
    backdropTouchable = true,
  }) => {
    const translateYAnim = useRef(new Animated.Value(drawerHeight)).current;
    const opacityAnim = useRef(new Animated.Value(open ? 1 : 0)).current;
    const [renderComponent, setRenderComponent] = useState(open);
    const [keyboardHeight, setKeyboardHeight] = useState(0);

    const panResponder = useRef(
      PanResponder.create({
        onStartShouldSetPanResponder: () => false,
        onMoveShouldSetPanResponder: (evt, gestureState) => {
          const isVerticalSwipe =
            Math.abs(gestureState.dx) < Math.abs(gestureState.dy);
          const isSwipeDown = gestureState.dy > 0;
          return isVerticalSwipe && isSwipeDown;
        },
        onPanResponderMove: (evt, gestureState) => {
          if (gestureState.dy > 0) {
            translateYAnim.setValue(Number(gestureState.dy));
          }
        },
        onPanResponderRelease: (evt, gestureState) => {
          if (gestureState.dy > 200) {
            onClose();
          } else {
            Animated.timing(translateYAnim, {
              toValue: 0,
              duration: 300,
              useNativeDriver: true,
            }).start();
          }
        },
      })
    ).current;
  
    useEffect(() => {
        if (open) {
            setRenderComponent(true);
          }
      Animated.timing(translateYAnim, {
        toValue: open ? 0 : 350,
        duration: 300,
        useNativeDriver: true,
      }).start();
      Animated.timing(opacityAnim, {
        toValue: open ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        if (!open) {
          // turn background invisible then hide it all together
          setRenderComponent(false);
        }
      });
    }, [open]);
    useEffect(() => {
        function keyboardWillShow(e) {
            const newOffset = e.endCoordinates.height;
            setKeyboardHeight(newOffset);
        }
        
    
        function keyboardWillHide(e) {
            setKeyboardHeight(0);
            Animated.timing(translateYAnim, {
                toValue: 0,
                duration: e.duration,
                useNativeDriver: true,
            }).start();
        }
    
        // Platform specific events
        const showEvent = Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
        const hideEvent = Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";
    
        const showListener = Keyboard.addListener(showEvent, keyboardWillShow);
        const hideListener = Keyboard.addListener(hideEvent, keyboardWillHide);
    
        return () => {
            showListener.remove();
            hideListener.remove();
        };
    }, []);
    
    return renderComponent?(
        <Animated.View style={[styles.container,backdropStyle]}>
            {backdropTouchable ? (
                <TouchableOpacity style={styles.backdropTouchSurface} onPress={onClose} />
            ) : (
                <View style={styles.backdropTouchSurface} />
            )}
            <Animated.View  
            style={[
                     styles.drawer,
                     { transform: [{ translateY: translateYAnim }], height: drawerHeight },
                    drawerStyle,
            ]}>
                <View style={[styles.drawerHandleContainer,topTouchAreaStyle]} {...panResponder.panHandlers}>
                        {handleVisible&&<View style={[styles.drawerVisualHandle,handleStyle]}/>}
                </View>
                {children}
            </Animated.View>
        </Animated.View>
    ):null
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        width:'100%',
        backgroundColor:'rgba(0,0,0,0.6)'
    },
    drawer:{
        width:'100%',
        height:350,
        backgroundColor:'#fff',
        position:'absolute',
        borderTopRightRadius:15,
        borderTopLeftRadius:15,
        bottom:0
    },
    drawerHandleContainer:{
        width:'100%',
        height:30,
        borderRadius:15,
        alignItems:'center',
        paddingTop:5
    },
    drawerVisualHandle:{
        height:5,
        width:50,
        borderRadius:3,
        backgroundColor:'#9DB2BF'
    },
    backdropTouchSurface:{
        flex:1,
        width:'100%'
    }
    
})

export default FluidDrawerNative