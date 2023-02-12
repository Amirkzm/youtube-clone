import { Box } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChannelDetails from "./components/ChannelDetails";
import Feed from "./components/Feed";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Box sx={{ backgroundColor: "common.black" }}>
        <Navbar />
        <Feed />
        <Routes>
          {/* <Route path="/" element={<Feed />} /> */}
          {/* <Route path="/video/:id" element={<VideoDetail />} /> */}
          <Route path="/channel/:id" element={<ChannelDetails />} />
          {/* <Route path="/search/:searchTerm" element={<SearchFeed />} /> */}
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;
