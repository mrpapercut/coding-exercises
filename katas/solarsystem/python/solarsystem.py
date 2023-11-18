import itertools
import math
import turtle

class SolarSystemBody(turtle.Turtle):
    min_display_size = 20
    display_log_base = 1.1

    def __init__(self, solar_system, mass, position=(0, 0), velocity=(0, 0), name=''):
        super().__init__()
        self.mass = mass
        self.setposition(position)
        self.velocity = velocity
        self.name = name
        self.display_size = max(
            math.log(self.mass, self.display_log_base),
            self.min_display_size
        )

        self.distance_traveled = 0

        self.penup()
        self.hideturtle()

        solar_system.add_body(self)

    def draw(self):
        self.clear()
        self.dot(self.display_size)

    def move(self):
        origin = (self.xcor(), self.ycor())
        target = (origin[0] + self.velocity[0], origin[1] + self.velocity[1])

        distance = math.sqrt((target[0] - origin[0]) ** 2 + (target[1] - origin[1]) ** 2)

        self.distance_traveled += distance

        self.setx(target[0])
        self.sety(target[1])

    def draw_name(self):
        setcolor = self.color()
        self.color('black')
        self.write(self.name, align='center', font=('Arial', 10, 'bold'))
        self.color(setcolor[0])


class Star(SolarSystemBody):
    def __init__(self, solar_system, mass, position=(0, 0), velocity=(0, 0), name=''):
        super().__init__(solar_system, mass, position, velocity, name)
        self.color('yellow')


class Planet(SolarSystemBody):
    colors = itertools.cycle(['red', 'green', 'blue'])

    def __init__(self, solar_system, mass, position=(0, 0), velocity=(0, 0), name=''):
        super().__init__(solar_system, mass, position, velocity, name)
        self.color(next(Planet.colors))

class SolarSystem:
    def __init__(self, width, height) -> None:
        self.solar_system = turtle.Screen()
        self.solar_system.tracer(0)
        self.solar_system.setup(width, height)
        self.solar_system.bgcolor('black')

        self.text = turtle.Turtle()
        self.text.hideturtle()
        self.text.setposition((width / 2 - 100, 0 - height / 2))
        self.text.speed(0)
        self.text.color('white')

        self.font = ("Arial", 12, "bold")

        self.bodies = []

    def add_body(self, body):
        self.bodies.append(body)

    def remove_body(self, body):
        body.clear()
        self.bodies.remove(body)

    def update_all(self):
        text = ''

        for body in self.bodies:
            body.move()
            body.draw()
            body.draw_name()

            body_pos = body.pos()
            text += '\n'.join([
                f'{body.name}:',
                f'Position:',
                f'x: {round(body_pos[0])}',
                f'y: {round(body_pos[1])}',
                f'Velocity:',
                f'x: {round(body.velocity[0])}',
                f'y: {round(body.velocity[1])}',
                f'Distance traveled:',
                f'{round(body.distance_traveled)}'
            ]) + '\n'

        self.text.clear()
        self.text.write(text, font=self.font)

        self.solar_system.update()

    @staticmethod
    def accelerate_due_to_gravity(first: SolarSystemBody, second: SolarSystemBody):
        force = first.mass * second.mass / first.distance(second) ** 2
        angle = first.towards(second)
        reverse = 1

        for body in first, second:
            acceleration = force / body.mass
            acc_x = acceleration * math.cos(math.radians(angle))
            acc_y = acceleration * math.sin(math.radians(angle))
            body.velocity = (
                body.velocity[0] + (reverse * acc_x),
                body.velocity[1] + (reverse * acc_y)
            )
            reverse = -1

    def check_collision(self, first, second):
        if isinstance(first, Planet) and isinstance(second, Planet):
            return

        if first.distance(second) < first.display_size/2 + second.display_size/2:
            for body in first, second:
                if isinstance(body, Planet):
                    self.remove_body(body)

    def calculate_all_body_interactions(self):
        bodies_copy = self.bodies.copy()

        for idx, first in enumerate(bodies_copy):
            for second in bodies_copy[idx + 1:]:
                self.accelerate_due_to_gravity(first, second)
                self.check_collision(first, second)

# TODO:
# - Calculate number of orbits per body OR calculate total distance per body
# - Check distances to other objects -> use gravity from closest body (draw line from body to gravity-partner)
# - If body is greater than N from its nearest gravity-partner, it is considered ejected
# - Automate starts & planets to determine best parameters
#   - If body crashes or is ejected, stop simulation & retry with new params
#   - Timeout after N seconds
#   - Log number orbits / total distance