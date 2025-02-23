import { useState } from "react";
import {
  Box,
  CssBaseline,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Card,
  CardContent,
  Grid,
  IconButton,
  Divider,
  useTheme,
  Container,
} from "@mui/material";
import {
  Dashboard,
  BarChart,
  Menu as MenuIcon,
  ChevronLeft,
  ChevronRight,
  Assessment,
  Settings,
  AccountCircle,
} from "@mui/icons-material";
import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const drawerWidth = 240;
const collapsedWidth = 70;

const data = [
  { name: "Jan", Investment: 100, Loss: 20, Profit: 50, Maintenance: 30 },
  { name: "Feb", Investment: 200, Loss: 50, Profit: 100, Maintenance: 30 },
  { name: "Mar", Investment: 150, Loss: 30, Profit: 70, Maintenance: 20 },
  { name: "Apr", Investment: 120, Loss: 20, Profit: 90, Maintenance: 40 },
  { name: "May", Investment: 170, Loss: 40, Profit: 120, Maintenance: 30 },
];

const ControlePage = () => {
  const [open, setOpen] = useState(true);
  const theme = useTheme();

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: theme.palette.primary.main,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            sx={{ mr: 2 }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="persistent"
        open={open}
        sx={{
          width: open ? drawerWidth : collapsedWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: open ? drawerWidth : collapsedWidth,
            transition: "width 0.3s ease",
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
          <IconButton onClick={handleDrawerToggle}>
            {open ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </Box>
        <List>
          {[
            { text: "Dashboard", icon: <Dashboard /> },
            { text: "Analytics", icon: <Assessment /> },
            { text: "Invoice", icon: <BarChart /> },
            { text: "CRM", icon: <AccountCircle /> },
            { text: "Settings", icon: <Settings /> },
          ].map(({ text, icon }) => (
            <ListItemButton key={text}>
              <ListItemIcon sx={{ color: theme.palette.text.primary }}>
                {icon}
              </ListItemIcon>
              <ListItemText
                primary={text}
                sx={{
                  opacity: open ? 1 : 0,
                  transition: "opacity 0.3s ease",
                  color: theme.palette.text.primary,
                }}
              />
            </ListItemButton>
          ))}
        </List>
        <Divider />
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            {[
              { label: "Total Earning", value: "$500.00" },
              { label: "Total Order", value: "$961.00" },
              { label: "Total Income", value: "$203k" },
            ].map((item, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <Card
                  sx={{
                    backgroundColor: theme.palette.card.main,
                    boxShadow: 3,
                  }}
                >
                  <CardContent>
                    <Typography variant="h6">{item.label}</Typography>
                    <Typography variant="h4">{item.value}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box mt={4}>
            <Typography variant="h6" gutterBottom>
              Total Growth
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <ReBarChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Investment" fill="#8884d8" />
                <Bar dataKey="Loss" fill="#82ca9d" />
                <Bar dataKey="Profit" fill="#ffc658" />
                <Bar dataKey="Maintenance" fill="#d0ed57" />
              </ReBarChart>
            </ResponsiveContainer>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default ControlePage;
