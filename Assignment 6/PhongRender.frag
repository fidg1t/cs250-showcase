#version 460

layout(location=0) in vec4 world_normal;
layout(location=1) in vec4 world_position;

layout(location=4)  uniform vec4 light_position[8];
layout(location=12) uniform vec3 light_color[8];
layout(location=20) uniform int light_use[8];
layout(location=28) uniform vec4 eye_position;
layout(location=29) uniform vec3 diffuse_coefficient;
layout(location=30) uniform vec3 specular_coefficient;
layout(location=31) uniform float specular_exponent;
layout(location=32) uniform vec3 ambient_color;

out vec4 frag_color;

void main()
{
  // Declarations
  vec3 color_ambient = diffuse_coefficient * ambient_color;
  vec3 color_diffuse = vec3(0);
  vec3 color_specular = vec3(0);

  vec4 V = normalize(eye_position - world_position);
  vec4 m = normalize(world_normal);

  for (int i = 0; i < 8; ++i)
  {
    if (light_use[i] == 0) continue;
    
    vec4 L = normalize(light_position[i] - world_position);
    float ML = max(0, dot(m, L));
    vec4 RL = normalize(2 * ML * m - L);

    // Diffuse Calculation
    color_diffuse += diffuse_coefficient * ML * light_color[i];

    // Specular Calculation
    if (ML > 0)
      color_specular += specular_coefficient * pow(max(0, dot(vec3(RL), vec3(V))), specular_exponent) * light_color[i];
  }
  
  frag_color = vec4(color_ambient + color_diffuse + color_specular, 1);
}