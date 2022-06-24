import { useEffect, useMemo, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import MasonryList from "@react-native-seoul/masonry-list";
import AutoHeightImage from "react-native-auto-height-image";
import Constants from "expo-constants";
import { BlurView } from "expo-blur";
import axios from "axios";

const navHeight = 0;

export default function App() {
  const [photos, setPhotos] = useState([]);

  const client_id = "jci8zwLw-PfIri_aoSwlIN0NV_ij5REls1sff1CbBeE";
  const base_url = "https://api.unsplash.com";

  useEffect(() => {
    getAllPhotos();
  }, []);

  const getAllPhotos = async () => {
    // axios
    //   .get(`${base_url}/photos?client_id=${client_id}`)
    //   .then((data) => setPhotos(data))
    //   .catch((err) => console.log(err.message));

    try {
      const response = await axios.get(
        `${base_url}/photos?client_id=${client_id}&per_page=${10}`
      );
      setPhotos(response.data);
    } catch (error) {
      console.log(err.message);
    }
  };

  const CardItem = ({ item, index }) => (
    <View
      style={{
        marginHorizontal: 5,
        marginBottom: 10,
      }}
    >
      <View
        style={{
          backgroundColor: item.color,
          borderRadius: 10,
          overflow: "hidden",
        }}
      >
        <AutoHeightImage
          width={200}
          source={{ uri: item.urls?.small }}
          resizeMode="cover"
        />
        <View
          style={{
            paddingVertical: 10,
            paddingHorizontal: 10,
            backgroundColor: `${item.color}90`,
            position: "absolute",
            top: 0,
            right: 0,
            margin: 5,
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              color: "red",
              fontSize: 15,
              fontWeight: "bold",
            }}
          >
            {index}
          </Text>
        </View>
      </View>
      <Text
        style={{
          color: "black",
          fontSize: 14,
          paddingHorizontal: 10,
          marginTop: 5,
        }}
      >
        {item.user.name}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <MasonryList
        data={photos}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, i }) => <CardItem item={item} index={i} />}
        // refreshing={isLoadingNext}
        // onRefresh={() => refetch({first: ITEM_CNT})}
        onRefresh={getAllPhotos}
        onEndReachedThreshold={0.1}
        // onEndReached={() => loadNext(ITEM_CNT)}
        style={{
          paddingBottom: Constants.statusBarHeight * 1.5 + navHeight,
        }}
        containerStyle={{
          paddingHorizontal: 10,
          paddingTop: Constants.statusBarHeight + navHeight,
        }}
      />
      <BlurView intensity={60} tint="light" style={styles.blurContainer} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
  },

  blurContainer: {
    width: "100%",
    height: Constants.statusBarHeight + navHeight,
    position: "absolute",
    zIndex: 2,
  },
});
