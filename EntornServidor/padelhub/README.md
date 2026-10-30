# 🏓PadelHub

PadelHub es una aplicación web que permite gestionar y reservar pistas de pádel de forma rápida y sencilla.
El sistema está orientado a usuarios que desean realizar reservas y a clubes que necesitan administrar sus pistas y disponibilidad.
Su finalidad es centralizar la oferta de pistas de pádel en el Vallès Occidental y facilitar el acceso a los jugadores.
Nuestro publico objetivo son jugadores de todo tipo tanto profesionales como aficionados, y por supuesto, clubes de padel que busquen mejorar su gestión interna y visibilidad.
Este proyecto no tan solo puede ayudar a jugadores y clubes a ganar más popularidad y facilitar el acceso de padel para todo el mundo, sino que tambien, permite que diferentes sitios de todo tipo puedan crear una comunidad donde puedan ser parte.

# ⭐ Características principales

    🔍 Buscar disponibilidad de pistas por fecha y hora.

    📅 Crear y gestionar reservas desde el área del usuario.

    🏢 Administración de clubes, incluyendo gestión de pistas e información del centro.

    🛠️ Administrador general con control total de usuarios, permisos y clubes.

# Objetivos
Nuestro objetivo principal es crear una aplicación funcional para una empresa, con funcionalidades básicas, pero que permita gestionar y reservar diferentes pistas o complejos deportivos de la zona del Valle Occidental.
Este enfoque regional permite garantizar un servicio especializado, adaptado a las necesidades locales de la comunidad padelera.

Definimos los objetivos del proyecto en diferentes puntos:

- Crear una plataforma web para reservar pistas de pádel en el Vallès Occidental.
- Facilitar a los usuarios la búsqueda de disponibilidad y la creación de reservas.
- Proporcionar a los clubes un sistema para gestionar pistas, horarios y reservas.
- Garantizar una experiencia sencilla, rápida y accesible desde cualquier dispositivo.
- Mantener la seguridad y correcta organización de los datos mediante una base de datos bien estructurada y un panel administrativo.

# Requerimientos
Es necesario definir correctamente los requerimientos para poder decidir dónde dirigirnos y cómo. Esto se realizará basándonos en los usuarios y sus diferentes necesidades.
El sistema PadelHub se compone de tres tipos principales de usuarios: el Usuario, el Administrador de Club y el Administrador de Complejo. Cada uno de ellos dispone de diferentes capacidades dentro de la plataforma, las cuales se representan en el diagrama de casos de uso y se describen a continuación.

## Usuario
El usuario es el actor principal de la plataforma, orientado a la reserva de pistas de pádel. 
A través del sistema, el usuario puede llevar a cabo varias acciones clave. En primer lugar, tiene la capacidad de registrarse, lo cual le permite acceder al resto de funcionalidades protegidas. Una vez registrado, el usuario puede buscar disponibilidad, consultando las pistas activas y sus franjas horarias libres. 
A partir de esta información, el usuario puede crear reservas, seleccionando la pista, fecha y hora deseada. 
Además, dispone de una sección donde puede visualizar todas sus reservas, tanto futuras como históricas, facilitando así la gestión personal de sus actividades deportivas.

## Administrador de Club
El Administrador de Club es el responsable de gestionar los recursos propios de un club específico. Este actor cuenta con permisos para ver reservas realizadas en su club, lo cual le permite supervisar la actividad diaria y el uso de las instalaciones. 
Asimismo, tiene la posibilidad de crear y modificar pistas, ajustando sus características, precios y disponibilidad. También puede gestionar la información general del club, como su nombre, dirección, horarios o estado operativo.
Estas funcionalidades permiten que cada club mantenga actualizada su oferta de pistas dentro de la plataforma.

## Administrador de Complejo (Superadministrador)
El Administrador de Complejo es el rol con mayor nivel de permisos dentro del sistema. En el diagrama se muestra que este actor puede gestionar roles y permisos, otorgando o restringiendo acceso a diferentes administradores según sus responsabilidades. También puede gestionar usuarios y clubes, lo que incluye la creación, edición o eliminación de cuentas administrativas y de complejos registrados en la plataforma. Además, este rol cuenta con acceso total a todas las funcionalidades del sistema, lo cual le permite supervisar, auditar y mantener la operatividad global de PadelHub. 
Este usuario actúa como el supervisor general del funcionamiento de la plataforma.


# 🛠️ Tecnologías utilizadas

Laravel

FilamentPHP

MySQL

Blade / HTML / CSS

# 📌 Estado del proyecto

Proyecto académico en desarrollo.
Se actualizará con nuevas funciones y mejoras visuales.

# Vision
Nuestra visión y deseo, es de convertirnos en la herramienta líder en la gestión y reserva de pistas de pádel en el Vallès Occidental, proporcionando valor añadido a los clubes y una experiencia superior a los jugadores.

# Autores
[Aimar Martinez Calzado](aimar.martinez.calzado@ibadia.cat)
</br>
[Mohamed Dukuray Waggeh](mahamadu.dukuray.waggeh@ibadia.cat)

---

## Qué aprendí (portfolio DAW)

### Conceptos técnicos
- **Laravel 12** de extremo a extremo: migrations, seeders, models, policies, middleware
- Panel de administración con **FilamentPHP 4**
- Autenticación y roles (usuario, admin club, superadmin)
- Relaciones Eloquent: User, Club, Court, Booking
- **Docker Compose** para MySQL local
- **Pest** para testing en Laravel
- **GitLab CI** y despliegue con Nginx

### Habilidades blandas
- Trabajo en equipo en un proyecto real de ciclo formativo
- Definición de requisitos, casos de uso y roles de usuario
- Documentación de proyecto para entrega académica
