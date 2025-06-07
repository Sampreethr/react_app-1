import SavedMovieCard from "@/components/SavedMovieCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { getSavedMovies } from "@/services/appwrite";
import useFetch from "@/services/usefetch";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Save = () => {
  const {
    data: savedMovies,
    loading,
    error,
    refetch
  } = useFetch(getSavedMovies, false);

  // Refetch saved movies when the tab comes into focus
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  if (loading) {
    return (
      <SafeAreaView className="bg-primary flex-1">
        <ActivityIndicator
          size="large"
          color="#AB8BFF"
          className="flex-1 self-center"
        />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="bg-primary flex-1 px-5">
        <View className="flex justify-center items-center flex-1">
          <Image source={icons.save} className="size-10" tintColor="#fff" />
          <Text className="text-red-500 text-base mt-3">
            Error loading saved movies: {error.message}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!savedMovies || savedMovies.length === 0) {
    return (
      <SafeAreaView className="bg-primary flex-1 px-5">
        <View className="flex justify-center items-center flex-1">
          <Image source={icons.save} className="size-10" tintColor="#fff" />
          <Text className="text-gray-500 text-base mt-3">No saved movies yet</Text>
          <Text className="text-gray-400 text-sm mt-2 text-center">
            Save movies from the details page to see them here
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="bg-primary flex-1">
      <Image
        source={images.bg}
        className="absolute w-full z-0"
        resizeMode="cover"
      />

      <View className="flex-1 px-5">
        <Image source={icons.logo} className="w-12 h-10 mt-10 mb-5 mx-auto" />

        <Text className="text-white text-xl font-bold mb-5">
          Saved Movies ({savedMovies.length})
        </Text>

        <FlatList
          data={savedMovies}
          renderItem={({ item }) => (
            <SavedMovieCard
              id={item.movie_id}
              title={item.title}
              poster_path={item.poster_path}
              vote_average={item.vote_average}
              release_date={item.release_date}
            />
          )}
          keyExtractor={(item) => item.$id}
          numColumns={3}
          columnWrapperStyle={{
            justifyContent: "flex-start",
            gap: 20,
            paddingRight: 5,
            marginBottom: 10,
          }}
          className="mt-2"
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default Save;