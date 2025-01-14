// vitest.config.unit.ts
import { defineConfig } from "file:///home/evan/WebstormProjects/ts-cab-delivery/node_modules/vitest/dist/config.js";
import { config } from "file:///home/evan/WebstormProjects/ts-cab-delivery/node_modules/dotenv/lib/main.js";
var env = config({ path: ".env.test" });
console.log(env.parsed);
var vitest_config_unit_default = defineConfig({
  test: {
    include: ["tests/**/*.spec.ts"],
    env: env.parsed
  },
  resolve: {
    alias: {
      // auth: '/src/auth',
      // quotes: '/src/quotes',
      // lib: '/src/lib'
    }
  }
});
export {
  vitest_config_unit_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZXN0LmNvbmZpZy51bml0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL2hvbWUvZXZhbi9XZWJzdG9ybVByb2plY3RzL3RzLWNhYi1kZWxpdmVyeVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvZXZhbi9XZWJzdG9ybVByb2plY3RzL3RzLWNhYi1kZWxpdmVyeS92aXRlc3QuY29uZmlnLnVuaXQudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvZXZhbi9XZWJzdG9ybVByb2plY3RzL3RzLWNhYi1kZWxpdmVyeS92aXRlc3QuY29uZmlnLnVuaXQudHNcIjsvLyB2aXRlc3QuY29uZmlnLnVuaXQudHNcblxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZXN0L2NvbmZpZydcblxuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSAnZG90ZW52JztcblxuY29uc3QgZW52ID0gY29uZmlnKHsgcGF0aDogJy5lbnYudGVzdCcgfSk7XG5jb25zb2xlLmxvZyhlbnYucGFyc2VkKVxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgICB0ZXN0OiB7XG4gICAgICAgIGluY2x1ZGU6IFsndGVzdHMvKiovKi5zcGVjLnRzJ10sXG4gICAgICAgIGVudjogZW52LnBhcnNlZCxcbiAgICB9LFxuICAgIHJlc29sdmU6IHtcbiAgICAgICAgYWxpYXM6IHtcbiAgICAgICAgICAgIC8vIGF1dGg6ICcvc3JjL2F1dGgnLFxuICAgICAgICAgICAgLy8gcXVvdGVzOiAnL3NyYy9xdW90ZXMnLFxuICAgICAgICAgICAgLy8gbGliOiAnL3NyYy9saWInXG4gICAgICAgIH1cbiAgICB9XG59KSJdLAogICJtYXBwaW5ncyI6ICI7QUFFQSxTQUFTLG9CQUFvQjtBQUU3QixTQUFTLGNBQWM7QUFFdkIsSUFBTSxNQUFNLE9BQU8sRUFBRSxNQUFNLFlBQVksQ0FBQztBQUN4QyxRQUFRLElBQUksSUFBSSxNQUFNO0FBQ3RCLElBQU8sNkJBQVEsYUFBYTtBQUFBLEVBQ3hCLE1BQU07QUFBQSxJQUNGLFNBQVMsQ0FBQyxvQkFBb0I7QUFBQSxJQUM5QixLQUFLLElBQUk7QUFBQSxFQUNiO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDTCxPQUFPO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFJUDtBQUFBLEVBQ0o7QUFDSixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
