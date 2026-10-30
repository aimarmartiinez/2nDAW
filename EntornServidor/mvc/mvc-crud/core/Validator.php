<?php
namespace Core;
class Validator {
    public static function make(array $data, array $rules): array {
        $errors = [];
        foreach ($rules as $field => $ruleStr) {
            $rulesArr = explode('|', $ruleStr);
            $value = trim((string)($data[$field] ?? ''));
            foreach ($rulesArr as $rule) {
                if ($rule === 'required' && $value === '') {
                    $errors[$field][] = 'Este campo es obligatorio.';
                } elseif (str_starts_with($rule, 'min:')) {
                    $min = (int)substr($rule, 4);
                    if (mb_strlen($value) < $min) $errors[$field][] = "Debe tener al menos $min caracteres.";
                } elseif (str_starts_with($rule, 'max:')) {
                    $max = (int)substr($rule, 4);
                    if (mb_strlen($value) > $max) $errors[$field][] = "No puede superar $max caracteres.";
                }
            }
        }
        return $errors;
    }
}
