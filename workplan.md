# Engine

1. Add initialization function to Drawables, which is called on engine add.
2. Finish animation definition, looping animations 

# Building Blocks

1. Add image and spritesheet renderers
2. Add Drawables/Animations for images and spritesheets. 
3. Add animations for translation, rotation, scaling and skewing.
4. Add higher order Drawable for chaining animations.
5. Add Drawable collection drawables with sorting orders. (based on x, y or custom sorter) - might need some data structure to be efficient.
6. Add background paralax Drawable (consisting of multiple loops)
7. Add higher order Drawable for setting animation state (AnimationFrame)
8.? Movement builder? - Linear interpolation over matrices. Need to check the math to see if it is possible - Are the points as result of the transformation of the original point by the matrix a part of a dense set

# Math

1. Add matrices and matrix functions

# Animation Builder Tool

1. Basic drawable serializer/deserializer
2. Interface for creating drawables with import/export and keyvalue storage - simple API which stores in mongodb

# Maps and collisions

1. Sidescroller map with grid collision
2. General map
3. General grid map
4. 2d overview map
5. 2d side view map
6. Map transitions
