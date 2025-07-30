// Name:       Nicholas Brennan
// Date:       6/25/25
// Assignment: 6

#version 460

layout(location=0) in vec4 world_normal;
layout(location=1) in vec4 world_position;

layout(location=4)  uniform vec4 light_position;
layout(location=5)  uniform vec4 eye_position;
layout(location=6)  uniform vec3 light_color;
layout(location=7)  uniform vec3 diffuse_coefficient;
layout(location=8)  uniform vec3 specular_coefficient;
layout(location=9)  uniform float specular_exponent;
layout(location=10) uniform vec3 ambient_color;

out vec4 frag_color;

void main()
{
  // Declarations
  vec4 L = normalize(light_position - world_position);
  vec4 m = normalize(world_normal);
  float ML = max(0, dot(m, L));
  vec4 V = normalize(eye_position - world_position);
  vec4 RL = normalize(2 * ML * m - L);

  // Ambient Calculation
  vec3 color_ambient = diffuse_coefficient * ambient_color;

  // Diffuse Calculation
  vec3 color_diffuse = diffuse_coefficient * ML * light_color;

  // Specular Calculation
  vec3 color_specular = specular_coefficient * pow(max(0, dot(vec3(RL), vec3(V))), specular_exponent) * light_color * ML;
  
  frag_color = vec4(color_ambient + color_diffuse + color_specular, 1);
}