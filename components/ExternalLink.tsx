import { Link } from "expo-router";
import { openBrowserAsync } from "expo-web-browser";
import { type ComponentProps } from "react";
import { Platform } from "react-native";

type Props = Omit<ComponentProps<typeof Link>, "href"> & { href: string };

export function ExternalLink({ href, ...rest }: Props) {
  return (
    <Link
      target="_blank"
 href={href}
      onPress={async (event) => {
        if (Platform.OS !== "web") {
          event.preventDefault(); // Prevents navigation in the default browser
          try {
            await openBrowserAsync(href); // Opens the link in the in-app browser
          } catch (error) {
            console.error("Failed to open browser:", error);
          }
        }
      }}
    />
  );
}
