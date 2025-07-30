#version 460

layout(location=0) in vec4 position;
layout(location=1) in vec4 normal;

layout(location=0) uniform mat4 persp_matrix;
layout(location=1) uniform mat4 view_matrix;
layout(location=2) uniform mat4 model_matrix;
layout(location=3) uniform mat4 normal_matrix;

layout(location=0) out vec4 world_normal;
layout(location=1) out vec4 world_position;

void main()
{
  world_position = model_matrix * position;
  world_normal = normal_matrix * normal;

  gl_Position = persp_matrix * view_matrix * world_position;
}