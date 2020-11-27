-- Create user table
CREATE SEQUENCE public.user_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647 START 1
	CACHE 1 NO CYCLE;

CREATE TABLE public. "user" (
	id bigint NOT NULL DEFAULT nextval('user_id_seq'::regclass),
	email character varying(255) COLLATE pg_catalog. "default" NOT NULL,
	phone character varying(255) COLLATE pg_catalog. "default",
	salt character varying(512) COLLATE pg_catalog. "default" NOT NULL,
	hashed_password character varying(1024) COLLATE pg_catalog. "default" NOT NULL,
	activated boolean DEFAULT FALSE,
	created_date timestamp with time zone NOT NULL DEFAULT now(),
	modified_date timestamp with time zone NOT NULL DEFAULT now(),
	CONSTRAINT user_pkey PRIMARY KEY (id))
TABLESPACE pg_default;

ALTER TABLE public. "user" OWNER TO postgres;

-- Create token table
CREATE SEQUENCE public.token_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647 START 1
	CACHE 1 NO CYCLE;

CREATE TABLE public.token (
	id bigint NOT NULL DEFAULT nextval('token_id_seq'::regclass),
	user_id bigint NOT NULL,
	type character varying(256) COLLATE pg_catalog. "default" NOT NULL,
	token character varying(512) COLLATE pg_catalog. "default" NOT NULL,
	created_date timestamp with time zone NOT NULL DEFAULT now(),
	modified_date timestamp with time zone NOT NULL DEFAULT now(),
	CONSTRAINT token_pkey PRIMARY KEY (id),
	CONSTRAINT token_user_fkey FOREIGN KEY (user_id) REFERENCES public. "user" (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION)
TABLESPACE pg_default;

ALTER TABLE public.token OWNER TO postgres;

