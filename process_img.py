from PIL import Image
import numpy as np

img = Image.open('src/assets/user_illustration.png').convert("RGBA")
data = np.array(img)

# Remove white background
r, g, b, a = data.T
white_areas = (r > 245) & (g > 245) & (b > 245)
data[..., 3][white_areas.T] = 0

# Skin tone adjustment
# The current skin tone in that specific illustration is a pinkish peach.
# Let's target pixels where R > 200, G > 120, B < 180 and B > 100 (approximate)
# Actually, the image provided has skin tone roughly R=255, G=163, B=141 (approx)
skin_areas = (r > 220) & (g > 130) & (g < 200) & (b > 100) & (b < 160)

# Make it fairer by increasing green and blue channels
data[..., 1][skin_areas.T] = np.minimum(255, data[..., 1][skin_areas.T] * 1.15)
data[..., 2][skin_areas.T] = np.minimum(255, data[..., 2][skin_areas.T] * 1.25)

img_out = Image.fromarray(data)
img_out.save('src/assets/user_illustration.png')
print("Image processed successfully!")
