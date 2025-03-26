import {
  Collapsible, CollapsibleContent, CollapsibleTrigger, Sidebar, SidebarContent, SidebarFooter, SidebarGroup,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem
} from "@/components/ui";
import { ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useLocation, useParams } from "react-router";

import { NavUser } from "../user-nav";

import { SidebarItem } from "./types";

export const SideBar = (sidebarItems: SidebarItem[]) => {
  const params = useParams<{ slug: string }>();

  const items = useMemo(() => {
    return sidebarItems.map((item) => {
      return {
        ...item,
        href: item.href ? `/o/${params.slug}${item.href}` : undefined,
        child: item.child?.map((child) => ({
          ...child,
          href: `/o/${params.slug}${child.href}`
        }))
      }
    });
  }, [params.slug, sidebarItems])

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {items.map((item, index) => {
              return item.child ? (
                <CollapsibleItem key={item.title} item={item} index={index} />
              ) : (
                <Item key={item.title} item={item} />
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}

type Props = {
  item: SidebarItem;
  index: number;
}
function CollapsibleItem({ item, index }: Props) {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(item.child?.some((child) => pathname === child.href));
  const isSelected = (href: string) => pathname === href;

  return (
    <Collapsible
      key={item.title}
      defaultOpen={index === 1}
      className="group/collapsible"
      open={open}
      onOpenChange={setOpen}
    >
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton tooltip={item.title}>
              {item.icon && <item.icon className={item.color} />}
            <span>{item.title}</span>
            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        {item.child?.length ? (
          <CollapsibleContent>
            <SidebarMenuSub>
              {item.child.map((item) => (
                <SidebarMenuSubItem key={item.title} className={isSelected(item.href) ? "bg-accent" : ""}>
                  <SidebarMenuSubButton asChild>
                    <Link to={item.href}>{item.title}</Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        ) : null}
      </SidebarMenuItem>
    </Collapsible>
  )
}

type ItemProps = {
  item: SidebarItem;
}
function Item({ item }: ItemProps) {
  const { pathname } = useLocation();

  return (
    <SidebarMenuItem className={pathname === item.href ? "bg-accent" : ""}>
      <SidebarMenuButton tooltip={item.title} asChild>
        <Link to={item.href ?? "#"}>
          {item.icon && <item.icon className={item.color} />}
          <span>{item.title}</span>
          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}