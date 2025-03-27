import * as React from "react";
import {
  Card,
  List,
  Typography,
  Chip,
  Collapse,
  Button,
  Input,
  IconButton,
  Drawer,
} from "@material-tailwind/react";
import {
  Archive,
  EmptyPage,
  Folder,
  LogOut,
  Mail,
  Menu,
  MoreHorizCircle,
  NavArrowRight,
  Pin,
  Search,
  SelectFace3d,
  SendDiagonal,
  Bin,
  UserXmark,
  Xmark,
} from "iconoir-react";
import { FaCircleUser } from "react-icons/fa6";
const Links = [
  {
    icon: SendDiagonal,
    title: "Dashboard",
    href: "#",
  },
  {
    icon: EmptyPage,
    title: "Venues",
    href: "#",
  },
  {
    icon: Pin,
    title: "Accessibility",
    href: "#",
  },
];

export default function SidebarWithBurgerMenu() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <Drawer>
        <Drawer.Trigger className="group">
          <IconButton className="bg-zinc-400 rounded-none border-transparent hover:bg-zinc-400">
            <Xmark className="hidden h-4 w-4 stroke-2 group-data-[open=true]:block" />
            <Menu className="hidden h-4 w-4 stroke-2 group-data-[open=false]:block" />
          </IconButton>
        </Drawer.Trigger>
        <Drawer.Overlay>
          <Drawer.Panel placement="left" className="p-0">
            <div className="flex items-center justify-between gap-4">
              <Drawer.DismissTrigger
                as={IconButton}
                size="sm"
                variant="ghost"
                color="secondary"
                className="absolute right-2 top-2"
                isCircular
              >
                <Xmark className="h-5 w-5" />
              </Drawer.DismissTrigger>
            </div>
            <Card className="grid h-full border-none shadow-none">
              <div>
                <Card.Header className="mx-3 mb-0 mt-3 flex h-max items-center gap-2">
                  <FaCircleUser className="size-8" />
                  <div>
                    <Typography className="text-sm">Name</Typography>
                    <Typography className="font-sm font-medium">
                      Email
                    </Typography>
                  </div>
                </Card.Header>
                <hr className="-mx-3 mt-5 border-secondary" />
                <Card.Body className="p-3">
                  <List className="">
                    {Links.map(({ icon: Icon, title, href, badge }) => (
                      <List.Item key={title} href={href}>
                        <List.ItemStart>
                          <Icon className="h-[18px] w-[18px]" />
                        </List.ItemStart>
                        {title}
                        {badge && (
                          <List.ItemEnd>
                            <Chip size="sm" variant="ghost">
                              <Chip.Label>{badge}</Chip.Label>
                            </Chip>
                          </List.ItemEnd>
                        )}
                      </List.Item>
                    ))}

                    <hr className="-mx-3 my-3 border-secondary" />
                    <List.Item className="text-error hover:bg-error/10 hover:text-error focus:bg-error/10 focus:text-error">
                      <List.ItemStart>
                        <LogOut className="h-[18px] w-[18px]" />
                      </List.ItemStart>
                      Logout
                    </List.Item>
                  </List>
                </Card.Body>
              </div>
            </Card>
          </Drawer.Panel>
        </Drawer.Overlay>
      </Drawer>
    </>
  );
}
