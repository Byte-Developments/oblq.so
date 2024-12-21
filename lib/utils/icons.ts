import { IconDefinition, IconName } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

// Get valid icon names from fas object
export const validIconNames = Object.keys(fas).map(key => 
  key.replace(/^fa/, '').toLowerCase()
) as IconName[];

// Create a filtered record of valid icons
export const getValidIcons = (): Record<string, IconDefinition> => {
  return Object.entries(fas).reduce((acc, [key, icon]) => {
    const name = key.replace(/^fa/, '').toLowerCase();
    if (validIconNames.includes(name as IconName)) {
      acc[name] = icon;
    }
    return acc;
  }, {} as Record<string, IconDefinition>);
};

// Check if an icon name is valid
export const isValidIcon = (name: string): boolean => {
  return validIconNames.includes(name as IconName);
};