/*
below is a set of triggers to enforce restrictions on duplication and null/not null fields according to business logic
also a trigger to automatically create default albums for new users (profile pics and cover albums)
*/

-- TRIGGER FOR FRIEND REQUESTS
DELIMITER //

CREATE TRIGGER before_insert_friend
BEFORE INSERT ON Friends
FOR EACH ROW
BEGIN
    DECLARE inverse_exists INT;
    DECLARE requestee_exists INT;
	
    -- Prohibit if user 1 and 2 are the same
    IF NEW.requestedById = NEW.requestedToId THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'User cannot befriend self, insert disallowed';
    END IF;

    -- Check if inverse combination exists
    SELECT COUNT(*) INTO inverse_exists
    FROM Friends
    WHERE (requestedById = NEW.requestedToId AND requestedToId = NEW.requestedById);

    -- If the inverse exists, prevent the insert
    IF inverse_exists > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Inverse combination already exists, insert disallowed';
    END IF;
/*
    -- Not sure if this next one belongs here--either way needs validation higher up

    -- Check if requestee is deleted
    SELECT COUNT(*) INTO requestee_exists
    FROM Users
    WHERE (id = NEW.requestedToId AND isDeleted = 0);

    -- If the user is deleted, prevent the insert
    IF requestee_exists = 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Requested user is deleted, insert disallowed';
    END IF;
*/
END //

DELIMITER ;

-- TRIGGER FOR PROFILE PIC ALBUM AND COVER PHOTO ALBUM
DELIMITER //

CREATE TRIGGER after_insert_user
AFTER INSERT ON Users
FOR EACH ROW
BEGIN
    INSERT INTO Albums (`profileId`, `type`, `title`) VALUES
    (NEW.id, 'profilePic', 'profile pictures'),
    (NEW.id, 'coverPhoto', 'cover photos');

END //

DELIMITER ;

-- TRIGGER FOR POSTS
DELIMITER //

CREATE TRIGGER before_insert_post
BEFORE INSERT ON Posts
FOR EACH ROW
BEGIN	
    -- Prohibit image posts with null image id
    IF NEW.type != 'timeline' AND NEW.imageId IS NULL THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = `Posts of type 'profilePic', 'coverPhoto', or 'ablumImage' must include imageId, insert disallowed`;
    END IF;

    -- Prohibit image posts with null image id
    IF NEW.type != 'timeline' AND NEW.profileId IS NOT NULL THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = `Posts on other profiles must be of type 'timeline', insert disallowed`;
    END IF;

END //

DELIMITER ;

