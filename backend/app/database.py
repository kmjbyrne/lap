from flask_sqlalchemy import SQLAlchemy, Model

db = SQLAlchemy()


class KeyBase(Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)

    @classmethod
    def get(cls) -> []:
        """
        This helper function is at the root of the model hierarchy and serves as a all-for-on get.
        Initially this function was defined several times in the models. This made it more difficult
        to test the functions as abstracting and mocking away gets for each model is senseless.
        :rtype: list
        :return A list of returned model objects
        """
        return cls.query.all()

    @classmethod
    def get_by_id(cls, _id) -> object:
        """
        This helper function is at the root of the model hierarchy and serves as a get by id return one.

        :rtype: Task
        :return A single task object
        """
        return cls.query.filter_by(id=_id).first_or_404()

    @classmethod
    def handle_request(cls, request_partial):
        return request_partial()

    def persist(self):
        db.session.add(self)
        db.session.commit()
        return self

    def delete(self):
        db.session.delete(self)
        return db.session.commit()

    def to_dictionary(self):
        columns = [col for col in self.__mapper__.columns.keys()]
        extracted_model = dict(
            (a, v) for a, v in zip(self.__dict__.keys(), self.__dict__.values())
            if a in columns
        )
        return extracted_model

    def serialize_model(self, descend_level=True, exclusions=None):
        """
        This utility function dynamically converts Alchemy model classes into a dict using introspective lookups.
        This saves on manually mapping each model and all the fields. However, exclusions should be noted.
        Such as passwords and protected properties.
        :param descend_level: Whether or not to introspect to FK's
        :return: json data structure of model
        :rtype: dict
        """
        if not exclusions:
            exclusions = []
        # Define our model properties here. Columns and Schema relationships
        columns = [col for col in self.__mapper__.columns.keys() if col not in exclusions]
        relationships = self.__mapper__.relationships.keys()
        model_dictionary = self.__dict__
        resp = {}
        # First lets map the basic model attributes to key value pairs
        for c in columns:
            resp[c] = model_dictionary[c]
        if descend_level is False or not relationships:
            return resp
        # Now map the relationships
        for r in relationships:
            rel = getattr(self, r)
            if rel:
                resp[r] = self.convert_model_to_json(getattr(self, r), False)
        return resp


class DeclarativeBase(KeyBase):
    deleted = db.Column(db.VARCHAR(2), primary_key=False, nullable=True)


def create():
    db.create_all()