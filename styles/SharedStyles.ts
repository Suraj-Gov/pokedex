import { StyleSheet } from "react-native";

const sharedStyles = StyleSheet.create({
  fullHeightContainer: {
    height: "100%",
    backgroundColor: "#efefef",
  },
  centeredContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  horizontallyCenteredContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
  },
  list: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  topSearchView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  parentView: {
    paddingTop: 20,
  },
  searchInput: {
    width: 250,
    height: 35,
    padding: 8,
    backgroundColor: "rgba(255, 255, 255, 0.801)",
    borderRadius: 12,
  },
});

export default sharedStyles;
