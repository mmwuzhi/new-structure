declare module 'commander-help' {
  import { Command } from "commander"
  type CommanderHelp = (command: Command) => void
  const commanderHelp: CommanderHelp
  export default commanderHelp
}