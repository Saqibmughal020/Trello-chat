import React from "react";
import {
  Avatar,
  Box,
  Button,
  Menu,
  MenuItem,
  Typography,
  Skeleton,
} from "@mui/material";

const ChatBoxLoader = () => {
  return (
    <Box
      sx={{
        position: "relative",
        height: "100%",
        background: "#dae1f0",
        borderRadius: 5,
        overflow: "hidden",
      }}
    >
      {/* Chat Box Header */}
      <Box
        sx={{
          position: "sticky",
          height: "10%",
          background: "#051639",
          display: "flex",
          alignItems: "center",
          px: 5,
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{ px: 2, display: "flex", width: "100%", alignItems: "center" }}
        >
          <Box sx={{ width: "10%" }}>
            <Skeleton
              variant="circular"
              width={50}
              height={50}
              sx={{ background: "#c1c1c1" }}
            />
          </Box>
          <Box sx={{ width: "80%" }}>
            <Skeleton
              variant="text"
              width={"30%"}
              height={30}
              sx={{ background: "#c1c1c1", ml: 3 }}
            />
          </Box>
          <Skeleton
            variant="text"
            width={"10%"}
            height={30}
            sx={{ background: "#c1c1c1", ml: 3 }}
          />
        </Box>
      </Box>
      <Box sx={{ maxHeight: "70%", height: "100%", overflowY: "auto", px: 2 }}>
        <Box sx={{ width: "100%", pt: 1 }}>
          <Skeleton
            variant="text"
            width={"25%"}
            height={80}
            sx={{ background: "#c1c1c1", ml: 3, borderRadius: 5 }}
          />
        </Box>
        <Box
          sx={{
            width: "100%",
            pt: 1,
            display: "flex",
            justifyContent: "right",
          }}
        >
          <Skeleton
            variant="text"
            width={"25%"}
            height={80}
            sx={{ background: "#c1c1c1", ml: 3, borderRadius: 5 }}
          />
        </Box>
        <Box sx={{ width: "100%", pt: 1 }}>
          <Skeleton
            variant="text"
            width={"25%"}
            height={80}
            sx={{ background: "#c1c1c1", ml: 3, borderRadius: 5 }}
          />
        </Box>
        <Box
          sx={{
            width: "100%",
            pt: 1,
            display: "flex",
            justifyContent: "right",
          }}
        >
          <Skeleton
            variant="text"
            width={"25%"}
            height={80}
            sx={{ background: "#c1c1c1", ml: 3, borderRadius: 5 }}
          />
        </Box>
        <Box sx={{ width: "100%", pt: 1 }}>
          <Skeleton
            variant="text"
            width={"25%"}
            height={80}
            sx={{ background: "#c1c1c1", ml: 3, borderRadius: 5 }}
          />
        </Box>
        <Box
          sx={{
            width: "100%",
            pt: 1,
            display: "flex",
            justifyContent: "right",
          }}
        >
          <Skeleton
            variant="text"
            width={"25%"}
            height={80}
            sx={{ background: "#c1c1c1", ml: 3, borderRadius: 5 }}
          />
        </Box>
      </Box>
      <Box>
        <Box
          sx={{ px: 2, display: "flex", width: "100%", alignItems: "center" }}
        >
          <Skeleton
            variant="text"
            width={"80%"}
            height={100}
            sx={{ background: "#c1c1c1", mx: 3 }}
          />
          <Skeleton
            variant="text"
            width={"20%"}
            height={100}
            sx={{ background: "#c1c1c1", ml: 3, mr: 5 }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ChatBoxLoader;
