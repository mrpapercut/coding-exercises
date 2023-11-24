import time

from solarsystem import SolarSystem, Star, Planet

solar_system = SolarSystem(width=1400, height=900)

binary_system = (
    Star(solar_system, mass=10_000, position=(-200, 0), velocity=(0, 3.5), name='A'),
    Star(solar_system, mass=10_000, position=(200, 0), velocity=(0, -3.5), name='B'),

    Planet(solar_system, mass=20, position=(50, 0), velocity=(0, 11), name='1'),
    Planet(solar_system, mass=1, position=(-70, 10), velocity=(0, 13), name='2'),
    Planet(solar_system, mass=14, position=(300, -50), velocity=(-4, -12), name='3'),
)

# single_system = (
#     Star(solar_system, mass=10_000, position=(0, 0), name='A'),

#     Planet(solar_system, mass=20, position=(50, 200), velocity=(7, 1), name='1'),
#     Planet(solar_system, mass=9, position=(-70, 100), velocity=(4, 9), name='2'),
#     Planet(solar_system, mass=14, position=(300, -50), velocity=(-2, -5), name='3'),
# )

while True:
    solar_system.calculate_all_body_interactions()
    solar_system.update_all()
    time.sleep(1 / 120)
