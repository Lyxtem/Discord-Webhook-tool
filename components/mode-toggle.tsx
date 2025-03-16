"use client"

import { Moon, Sun, Globe } from "lucide-react"
import { useTheme } from "next-themes"
import { useState, useEffect, useContext } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { translate } from "@/lib/language-service"
import { LanguageContext } from "@/components/dashboard-page"

export function ModeToggle() {
  const { setTheme, theme } = useTheme()
  const { language, setLanguage } = useContext(LanguageContext)
  const [mounted, setMounted] = useState(false)

  // Ensure we're mounted before accessing localStorage
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="flex items-center gap-2">
      {/* Language Toggle */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Globe className="h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">{translate("app.language")}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setLanguage("en")} className={language === "en" ? "bg-accent" : ""}>
            English
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setLanguage("es")} className={language === "es" ? "bg-accent" : ""}>
            Español
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Theme Toggle */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">{translate("app.theme.system")}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme("light")}>{translate("app.theme.light")}</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>{translate("app.theme.dark")}</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>{translate("app.theme.system")}</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <a href="https://discord.gg/FHXdXAh4Hu" target="_blank" rel="noopener noreferrer">
              {translate("app.support")}
            </a>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

