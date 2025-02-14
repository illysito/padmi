const bg_shader_frag = `
#ifdef GL_ES
precision highp float;
#endif

uniform float u_time;
uniform float u_resolution;
uniform sampler2D u_texture;

varying vec2 v_texcoord;

vec4 rgb(float r,float g,float b){
    return vec4(r / 255.0, g / 255.0, b / 255.0, 1.0);
}

float random(vec2 uv) {
  return fract(sin(dot(uv.xy,
      vec2(12.9898,78.233))) *
          43758.5453123);
}

void main() {

    vec2 uv = v_texcoord;
    vec2 point = fract(uv*0.05 + 0.025*u_time);
    
    vec4 dispColor = texture2D(u_texture, point);

    float dispX = mix(-0.5, 0.5, dispColor.r);
    float dispY = mix(-0.5, 0.5, dispColor.b);

    vec4 blue = rgb(120.0, 255.0, 125.0);
    vec4 red = rgb(100.0, 140.0, 121.0);
    vec4 yellow = rgb(255.0, 133.0, 0.0);
    vec4 beige = rgb(205.0, 251.0, 216.0);
    
    vec4 gradient1 = mix(blue, red, uv.x + dispX);
    vec4 gradient2 = mix(yellow, beige, uv.x + dispX);

    float noise = random(uv);
    
    vec4 gradientMix = mix(gradient1, gradient2, uv.y + dispY + noise);
   
    gl_FragColor = gradientMix;
}
`
export default bg_shader_frag
