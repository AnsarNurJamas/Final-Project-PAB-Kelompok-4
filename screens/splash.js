import { StyleSheet, View } from 'react-native'
import React, { Component } from 'react'
import { getData } from '../utils/localStorage';

export default class Splash extends Component {
    componentDidMount() {
        setTimeout(async() => {
            const userData = await getData("user");
            if (userData) {
                this.props.navigation.replace('Tabs');
            } else {
                this.props.navigation.navigate('Login');
            }
        }, 3000)
    }

    render() {
        return (
            <View style={styles.pages}>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    pages: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})


// import { StyleSheet, View } from 'react-native';
// import React, { useEffect } from 'react';
// import { getData } from '../utils/localStorage';

// const Splash = ({ navigation }) => {
//   useEffect(() => {
//     const checkUserStatus = async () => {
//       try {
//         const userData = await getData('user');
//         if (userData) {
//           // Jika user data ada, periksa status admin
//           const isAdmin = userData.status === 'admin';

//           if (isAdmin) {
//             navigation.replace('Admin');
//           } else {
//             navigation.replace('Tabs');
//           }
//         } else {
//           navigation.replace('Login');
//         }
//       } catch (error) {
//         console.error('Error checking user status:', error);
//         navigation.replace('Login');
//       }
//     };

//     // Periksa status user saat komponen di-mount
//     checkUserStatus();
//   }, [navigation]);

//   return (
//     <View style={styles.pages}>
//       {/* Mungkin tambahkan elemen atau indikator loading jika diperlukan */}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   pages: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

// export default Splash;
