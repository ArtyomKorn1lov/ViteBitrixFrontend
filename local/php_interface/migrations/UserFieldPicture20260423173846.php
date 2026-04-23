<?php

namespace Sprint\Migration;


class UserFieldPicture20260423173846 extends Version
{
    protected $author = "admin";

    protected $description = "Пользовательское свойство изображение пользователя";

    protected $moduleVersion = "5.6.2";

    /**
     * @return bool|void
     * @throws Exceptions\HelperException
     */
    public function up()
    {
        $helper = $this->getHelperManager();
        $helper->UserTypeEntity()->saveUserTypeEntity(array(
            'ENTITY_ID' => 'USER',
            'FIELD_NAME' => 'UF_PICTURE',
            'USER_TYPE_ID' => 'file',
            'XML_ID' => '7bcdbb88-1e6d-4ffa-bcd0-ffe8b68fdd26',
            'SORT' => '100',
            'MULTIPLE' => 'N',
            'MANDATORY' => 'N',
            'SHOW_FILTER' => 'N',
            'SHOW_IN_LIST' => 'Y',
            'EDIT_IN_LIST' => 'Y',
            'IS_SEARCHABLE' => 'N',
            'SETTINGS' =>
                array(
                    'SIZE' => 20,
                    'LIST_WIDTH' => 0,
                    'LIST_HEIGHT' => 0,
                    'MAX_SHOW_SIZE' => 0,
                    'MAX_ALLOWED_SIZE' => 0,
                    'EXTENSIONS' =>
                        array(
                            'png' => true,
                            'jpg' => true,
                            'jpeg' => true,
                            'webp' => true,
                            'svg' => true,
                        ),
                    'TARGET_BLANK' => 'Y',
                ),
            'EDIT_FORM_LABEL' =>
                array(
                    'en' => 'Picture',
                    'ru' => 'Изображение',
                ),
            'LIST_COLUMN_LABEL' =>
                array(
                    'en' => 'Picture',
                    'ru' => 'Изображение',
                ),
            'LIST_FILTER_LABEL' =>
                array(
                    'en' => 'Picture',
                    'ru' => 'Изображение',
                ),
            'ERROR_MESSAGE' =>
                array(
                    'en' => 'Picture',
                    'ru' => 'Изображение',
                ),
            'HELP_MESSAGE' =>
                array(
                    'en' => 'Picture',
                    'ru' => 'Изображение',
                ),
        ));
    }

    public function down()
    {
    }
}
