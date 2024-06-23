import { accountSidebar } from "@/constants/accountSidebar";
import { Box, Stack } from "@mui/material";
import profileIcon from "@/assets/images/account-sidebar-icons/Frame 26086857.svg";
import { useGetUserInfo } from "../../hooks";

type AccountSideBarProps = {
  tab: string;
  setTab: React.Dispatch<React.SetStateAction<string>>;
};

export default function AccountSideBar({ tab, setTab }: AccountSideBarProps) {
  const { data } = useGetUserInfo();
  const handleTabChange = (str: string) => {
    setTab(str);
  };
  return (
    <Box
      sx={{
        width: "288px",
        height: "fit",
        py: "8px",
        borderRadius: "8px",
        backgroundColor: "#F6F6F6",
      }}
    >
      <Box sx={{ px: "8px", py: "2px", mb: "10px" }}>
        <Stack direction={"row"} alignItems={"center"}>
          <Box component="img" sx={{ mr: "16px" }} src={profileIcon.src} />
          <Box sx={{ fontSize: "20px", fontWeight: "600" }}>
            {data?.userName}
          </Box>
        </Stack>
      </Box>
      <Stack direction={"column"}>
        {accountSidebar.map((item) => (
          <Box
            key={item[1]}
            onClick={() => handleTabChange(item[1])}
            sx={{
              pl: "24px",
              py: "26px",
              cursor: "pointer",
              borderLeft: `solid 2px ${tab === item[1] ? "blue" : "inherit"} `,
            }}
          >
            <Stack direction={"row"} alignItems={"center"}>
              <Box
                component="img"
                sx={{ mr: "16px" }}
                src={item[0].src}
                alt={item[1]}
              />
              <Box
                sx={{
                  color: tab === item[1] ? "blue" : "inherit",
                  fontSize: "20px",
                  fontWeight: "300",
                }}
              >
                {item[1]}
              </Box>
            </Stack>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
