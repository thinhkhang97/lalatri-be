CREATE SEQUENCE public.user_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

CREATE TABLE public. "user" (
	id bigint NOT NULL DEFAULT nextval('user_id_seq'::regclass),
	email character varying(255) COLLATE pg_catalog. "default" NOT NULL,
	phone character varying(255) COLLATE pg_catalog. "default",
	salt character varying(255) COLLATE pg_catalog. "default" NOT NULL,
	hashed_password character varying(512) COLLATE pg_catalog. "default" NOT NULL,
	created_date timestamp with time zone NOT NULL,
	modified_date timestamp with time zone NOT NULL,
	CONSTRAINT user_pkey PRIMARY KEY (id))
TABLESPACE pg_default;

ALTER TABLE public. "user" OWNER TO postgres;